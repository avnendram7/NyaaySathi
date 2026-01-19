from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from datetime import datetime, timezone
import uuid
import os

from models.lawyer_application import AdminLogin
from services.database import db
from services.auth import create_admin_token, verify_admin_token

router = APIRouter(prefix="/admin", tags=["Admin"])
security = HTTPBearer()

# Admin credentials from environment
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@nyaaysathi.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')


def get_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to verify admin token"""
    return verify_admin_token(credentials.credentials)


@router.post("/login")
async def admin_login(login: AdminLogin):
    """Admin login"""
    if login.email != ADMIN_EMAIL or login.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    token = create_admin_token(login.email)
    return {'token': token, 'message': 'Login successful'}


@router.get("/lawyer-applications")
async def get_lawyer_applications(admin: dict = Depends(get_admin)):
    """Get all lawyer applications"""
    applications = await db.lawyer_applications.find({}).to_list(1000)
    
    # Convert ObjectId to string
    for app in applications:
        app['_id'] = str(app['_id'])
    
    # Calculate stats
    stats = {
        'pending': len([a for a in applications if a.get('status') == 'pending']),
        'approved': len([a for a in applications if a.get('status') == 'approved']),
        'rejected': len([a for a in applications if a.get('status') == 'rejected'])
    }
    
    return {'applications': applications, 'stats': stats}


@router.put("/lawyer-applications/{app_id}/approve")
async def approve_lawyer_application(app_id: str, admin: dict = Depends(get_admin)):
    """Approve a lawyer application"""
    # Find application
    application = await db.lawyer_applications.find_one({'_id': ObjectId(app_id)})
    if not application:
        raise HTTPException(status_code=404, detail='Application not found')
    
    if application.get('status') != 'pending':
        raise HTTPException(status_code=400, detail='Application already processed')
    
    # Update application status
    await db.lawyer_applications.update_one(
        {'_id': ObjectId(app_id)},
        {'$set': {'status': 'approved'}}
    )
    
    # Create lawyer user account
    user_data = {
        'id': str(uuid.uuid4()),
        'email': application['email'],
        'password_hash': application['password_hash'],
        'full_name': application['name'],
        'user_type': 'lawyer',
        'phone': application['phone'],
        'created_at': datetime.now(timezone.utc),
        # Lawyer specific fields
        'photo': application.get('photo'),
        'bar_council_number': application['bar_council_number'],
        'specialization': application['specialization'],
        'experience': application['experience'],
        'cases_won': application['cases_won'],
        'state': application['state'],
        'city': application['city'],
        'court': application['court'],
        'education': application['education'],
        'languages': application['languages'],
        'fee_range': application['fee_range'],
        'bio': application['bio'],
        'rating': 4.5,
        'is_verified': True
    }
    
    await db.users.insert_one(user_data)
    
    return {'message': 'Application approved successfully'}


@router.put("/lawyer-applications/{app_id}/reject")
async def reject_lawyer_application(app_id: str, admin: dict = Depends(get_admin)):
    """Reject a lawyer application"""
    # Find application
    application = await db.lawyer_applications.find_one({'_id': ObjectId(app_id)})
    if not application:
        raise HTTPException(status_code=404, detail='Application not found')
    
    if application.get('status') != 'pending':
        raise HTTPException(status_code=400, detail='Application already processed')
    
    # Update application status
    await db.lawyer_applications.update_one(
        {'_id': ObjectId(app_id)},
        {'$set': {'status': 'rejected'}}
    )
    
    return {'message': 'Application rejected'}
