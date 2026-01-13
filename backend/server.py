from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_DAYS = 30

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer()

# ============ MODELS ============

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    user_type: Literal['client', 'lawyer', 'law_firm']
    phone: Optional[str] = None
    firm_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    user_type: Literal['client', 'lawyer', 'law_firm']

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    user_type: Literal['client', 'lawyer', 'law_firm']
    phone: Optional[str] = None
    firm_name: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TokenResponse(BaseModel):
    token: str
    user: dict

class CaseCreate(BaseModel):
    title: str
    case_number: str
    description: str
    status: str = 'active'

class Case(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    case_number: str
    description: str
    status: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DocumentCreate(BaseModel):
    case_id: str
    title: str
    file_url: str
    file_type: str

class Document(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    case_id: str
    user_id: str
    title: str
    file_url: str
    file_type: str
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

class BookingCreate(BaseModel):
    lawyer_id: str
    date: str
    time: str
    description: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    lawyer_id: str
    date: str
    time: str
    description: str
    status: str = 'pending'
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WaitlistCreate(BaseModel):
    email: EmailStr
    full_name: str
    message: Optional[str] = None

class Waitlist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============ UTILITIES ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str, user_type: str) -> str:
    payload = {
        'user_id': user_id,
        'user_type': user_type,
        'exp': datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION_DAYS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    user = await db.users.find_one({'id': payload['user_id']}, {'_id': 0})
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return user

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Nyaay Sathi API"}

# Auth Routes
@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({'email': user_data.email, 'user_type': user_data.user_type}, {'_id': 0})
    if existing:
        raise HTTPException(status_code=400, detail='User already exists')
    
    user_dict = user_data.model_dump()
    hashed_pwd = hash_password(user_dict.pop('password'))
    user_obj = User(**user_dict)
    
    doc = user_obj.model_dump()
    doc['password'] = hashed_pwd
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.users.insert_one(doc)
    
    token = create_token(user_obj.id, user_obj.user_type)
    user_response = user_obj.model_dump()
    
    return {'token': token, 'user': user_response}

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(login_data: UserLogin):
    user = await db.users.find_one({'email': login_data.email, 'user_type': login_data.user_type}, {'_id': 0})
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    if not verify_password(login_data.password, user['password']):
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    token = create_token(user['id'], user['user_type'])
    user_response = {k: v for k, v in user.items() if k != 'password'}
    
    return {'token': token, 'user': user_response}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {k: v for k, v in current_user.items() if k != 'password'}

# Case Routes
@api_router.post("/cases", response_model=Case)
async def create_case(case_data: CaseCreate, current_user: dict = Depends(get_current_user)):
    case_dict = case_data.model_dump()
    case_dict['user_id'] = current_user['id']
    case_obj = Case(**case_dict)
    
    doc = case_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.cases.insert_one(doc)
    return case_obj

@api_router.get("/cases", response_model=List[Case])
async def get_cases(current_user: dict = Depends(get_current_user)):
    if current_user['user_type'] == 'client':
        cases = await db.cases.find({'user_id': current_user['id']}, {'_id': 0}).to_list(100)
    else:
        cases = await db.cases.find({}, {'_id': 0}).to_list(100)
    
    for case in cases:
        if isinstance(case['created_at'], str):
            case['created_at'] = datetime.fromisoformat(case['created_at'])
        if isinstance(case['updated_at'], str):
            case['updated_at'] = datetime.fromisoformat(case['updated_at'])
    
    return cases

@api_router.get("/cases/{case_id}", response_model=Case)
async def get_case(case_id: str, current_user: dict = Depends(get_current_user)):
    case = await db.cases.find_one({'id': case_id}, {'_id': 0})
    if not case:
        raise HTTPException(status_code=404, detail='Case not found')
    
    if isinstance(case['created_at'], str):
        case['created_at'] = datetime.fromisoformat(case['created_at'])
    if isinstance(case['updated_at'], str):
        case['updated_at'] = datetime.fromisoformat(case['updated_at'])
    
    return case

# Document Routes
@api_router.post("/documents", response_model=Document)
async def create_document(doc_data: DocumentCreate, current_user: dict = Depends(get_current_user)):
    doc_dict = doc_data.model_dump()
    doc_dict['user_id'] = current_user['id']
    doc_obj = Document(**doc_dict)
    
    doc = doc_obj.model_dump()
    doc['uploaded_at'] = doc['uploaded_at'].isoformat()
    
    await db.documents.insert_one(doc)
    return doc_obj

@api_router.get("/documents", response_model=List[Document])
async def get_documents(case_id: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    query = {'user_id': current_user['id']}
    if case_id:
        query['case_id'] = case_id
    
    documents = await db.documents.find(query, {'_id': 0}).to_list(100)
    
    for doc in documents:
        if isinstance(doc['uploaded_at'], str):
            doc['uploaded_at'] = datetime.fromisoformat(doc['uploaded_at'])
    
    return documents

# Chat Routes
@api_router.post("/chat", response_model=ChatResponse)
async def chat(chat_msg: ChatMessage, current_user: dict = Depends(get_current_user)):
    session_id = current_user['id']
    
    system_prompt = """You are a helpful legal assistant for Nyaay Sathi platform. 
    Format your responses in clear, structured sections using markdown:
    
    ## Main Point
    Brief summary here
    
    ### Key Details
    - Point 1
    - Point 2
    
    ### Next Steps
    1. Action 1
    2. Action 2
    
    Keep responses simple, clear, and organized in boxes/sections for easy readability.
    Focus on helping users understand their legal situation without complex jargon."""
    
    try:
        chat_client = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=session_id,
            system_message=system_prompt
        ).with_model('gemini', 'gemini-3-flash-preview')
        
        user_message = UserMessage(text=chat_msg.message)
        response = await chat_client.send_message(user_message)
        
        chat_history = {
            'id': str(uuid.uuid4()),
            'user_id': current_user['id'],
            'session_id': session_id,
            'message': chat_msg.message,
            'response': response,
            'timestamp': datetime.now(timezone.utc).isoformat()
        }
        await db.chat_history.insert_one(chat_history)
        
        return {'response': response, 'session_id': session_id}
    except Exception as e:
        logging.error(f'Chat error: {str(e)}')
        raise HTTPException(status_code=500, detail=f'Chat service error: {str(e)}')

@api_router.get("/chat/history")
async def get_chat_history(current_user: dict = Depends(get_current_user)):
    history = await db.chat_history.find(
        {'user_id': current_user['id']},
        {'_id': 0}
    ).sort('timestamp', -1).limit(50).to_list(50)
    return history

# Booking Routes
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate, current_user: dict = Depends(get_current_user)):
    if current_user['user_type'] != 'client':
        raise HTTPException(status_code=403, detail='Only clients can book consultations')
    
    booking_dict = booking_data.model_dump()
    booking_dict['client_id'] = current_user['id']
    booking_obj = Booking(**booking_dict)
    
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(current_user: dict = Depends(get_current_user)):
    if current_user['user_type'] == 'client':
        bookings = await db.bookings.find({'client_id': current_user['id']}, {'_id': 0}).to_list(100)
    else:
        bookings = await db.bookings.find({'lawyer_id': current_user['id']}, {'_id': 0}).to_list(100)
    
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings

@api_router.patch("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str, current_user: dict = Depends(get_current_user)):
    if current_user['user_type'] != 'lawyer':
        raise HTTPException(status_code=403, detail='Only lawyers can update booking status')
    
    result = await db.bookings.update_one(
        {'id': booking_id, 'lawyer_id': current_user['id']},
        {'$set': {'status': status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail='Booking not found')
    
    return {'success': True}

# Lawyer Routes
@api_router.get("/lawyers", response_model=List[User])
async def get_lawyers():
    lawyers = await db.users.find({'user_type': 'lawyer'}, {'_id': 0, 'password': 0}).to_list(100)
    
    for lawyer in lawyers:
        if isinstance(lawyer.get('created_at'), str):
            lawyer['created_at'] = datetime.fromisoformat(lawyer['created_at'])
    
    return lawyers

# Waitlist Routes
@api_router.post("/waitlist", response_model=Waitlist)
async def join_waitlist(waitlist_data: WaitlistCreate):
    existing = await db.waitlist.find_one({'email': waitlist_data.email}, {'_id': 0})
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    
    waitlist_obj = Waitlist(**waitlist_data.model_dump())
    
    doc = waitlist_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.waitlist.insert_one(doc)
    return waitlist_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()