from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
import uuid
from models.booking import Booking, BookingCreate
from services.database import db
from routes.auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("/guest", response_model=dict)
async def create_guest_booking(booking_data: dict):
    """Create a booking without authentication (for first-time users)"""
    booking_id = str(uuid.uuid4())
    
    booking_doc = {
        'id': booking_id,
        'fullName': booking_data.get('fullName'),
        'email': booking_data.get('email'),
        'phone': booking_data.get('phone'),
        'consultationType': booking_data.get('consultationType'),
        'date': booking_data.get('date'),
        'time': booking_data.get('time'),
        'description': booking_data.get('description', ''),
        'amount': booking_data.get('amount'),
        'status': booking_data.get('status', 'confirmed'),
        'payment_status': booking_data.get('payment_status', 'paid'),
        'payment_method': booking_data.get('payment_method', 'card'),
        'card_last_four': booking_data.get('card_last_four', ''),
        'created_at': datetime.utcnow().isoformat(),
        'client_id': None  # Will be linked when user signs up
    }
    
    await db.bookings.insert_one(booking_doc)
    return {'id': booking_id, 'message': 'Booking created successfully'}


@router.post("", response_model=Booking)
async def create_booking(booking_data: BookingCreate, current_user: dict = Depends(get_current_user)):
    """Create a new booking"""
    if current_user['user_type'] != 'client':
        raise HTTPException(status_code=403, detail='Only clients can book consultations')
    
    booking_dict = booking_data.model_dump()
    booking_dict['client_id'] = current_user['id']
    booking_obj = Booking(**booking_dict)
    
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    return booking_obj


@router.get("", response_model=List[Booking])
async def get_bookings(current_user: dict = Depends(get_current_user)):
    """Get bookings for current user"""
    if current_user['user_type'] == 'client':
        bookings = await db.bookings.find({'client_id': current_user['id']}, {'_id': 0}).to_list(100)
    else:
        bookings = await db.bookings.find({'lawyer_id': current_user['id']}, {'_id': 0}).to_list(100)
    
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings


@router.patch("/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str, current_user: dict = Depends(get_current_user)):
    """Update booking status (lawyers only)"""
    if current_user['user_type'] != 'lawyer':
        raise HTTPException(status_code=403, detail='Only lawyers can update booking status')
    
    result = await db.bookings.update_one(
        {'id': booking_id, 'lawyer_id': current_user['id']},
        {'$set': {'status': status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail='Booking not found')
    
    return {'success': True}
