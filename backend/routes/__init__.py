# Routes Package
from .auth import router as auth_router
from .cases import router as cases_router
from .documents import router as documents_router
from .chat import router as chat_router
from .bookings import router as bookings_router
from .lawyers import router as lawyers_router
from .lawfirms import router as lawfirms_router
from .waitlist import router as waitlist_router
from .admin import router as admin_router

__all__ = [
    'auth_router',
    'cases_router', 
    'documents_router',
    'chat_router',
    'bookings_router',
    'lawyers_router',
    'lawfirms_router',
    'waitlist_router',
    'admin_router'
]
