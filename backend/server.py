from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
import sys

# Add backend directory to path for imports
ROOT_DIR = Path(__file__).parent
sys.path.insert(0, str(ROOT_DIR))

load_dotenv(ROOT_DIR / '.env')

# Import routes
from routes import (
    auth_router,
    cases_router,
    documents_router,
    chat_router,
    bookings_router,
    lawyers_router,
    lawfirms_router,
    waitlist_router,
    admin_router
)
from services.database import close_db

# Create the main app
app = FastAPI(title="Nyaay Sathi API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Root endpoints
@api_router.get("/")
async def root():
    return {"message": "Nyaay Sathi API"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Nyaay Sathi API"}


# Include all route modules
api_router.include_router(auth_router)
api_router.include_router(cases_router)
api_router.include_router(documents_router)
api_router.include_router(chat_router)
api_router.include_router(bookings_router)
api_router.include_router(lawyers_router)
api_router.include_router(waitlist_router)
api_router.include_router(admin_router)

# Legacy endpoint for lawyer applications (for backward compatibility)
from routes.lawyers import submit_lawyer_application
api_router.post("/lawyer-applications")(submit_lawyer_application)

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
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
    await close_db()
