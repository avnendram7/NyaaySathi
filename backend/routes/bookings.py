from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models.booking import Booking, BookingCreate
from services.database import db
from routes.auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])


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
