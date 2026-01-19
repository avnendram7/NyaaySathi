# Nyaay Sathi - Legal Tech Platform PRD

## Original Problem Statement
Build a legal-tech platform with the following features:
- Role-based access (Client, Lawyer, Law Firm)
- AI-powered legal assistant chatbot
- Lawyer discovery and booking system
- Lawyer application and admin approval workflow
- Case management and document upload

## User Personas
1. **Clients**: Seeking legal advice and lawyer connections
2. **Lawyers**: Building practice and reaching clients
3. **Law Firms**: Managing lawyers and scaling operations
4. **Admins**: Approving lawyer applications and managing platform

## Core Requirements
- User authentication (JWT-based)
- Role selection (User/Lawyer/Law Firm)
- AI chatbot with card-based responses
- Lawyer search with filters (state, city, court, case type)
- Lawyer application workflow with admin approval
- Protected dashboards for each user type

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, lucide-react
- **Backend**: FastAPI, Python, Pydantic
- **Database**: MongoDB
- **AI**: Gemini via emergentintegrations

---

## Changelog

### January 19, 2026
**P0 Fix: Sign Up Link Redirection**
- Updated `UserLoginPage.js`, `LawyerLoginPage.js`, `LawFirmLoginPage.js`
- "Sign Up" links now redirect to `/role-selection` (Get Started page)
- Simplified login pages to login-only (removed signup forms)

**P1 Task: Backend Refactoring (COMPLETED)**
- Refactored monolithic `server.py` (695 lines) into modular structure:
  - `/models/` - Pydantic models (user, case, document, chat, booking, waitlist, lawyer_application)
  - `/routes/` - API routers (auth, cases, documents, chat, bookings, lawyers, waitlist, admin)
  - `/services/` - Business logic (auth, database, chat_service)
- New `server.py` is now ~75 lines (was 695)
- Improved maintainability and scalability

---

## Architecture

```
/app/backend/
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── case.py
│   ├── document.py
│   ├── chat.py
│   ├── booking.py
│   ├── waitlist.py
│   └── lawyer_application.py
├── routes/
│   ├── __init__.py
│   ├── auth.py
│   ├── cases.py
│   ├── documents.py
│   ├── chat.py
│   ├── bookings.py
│   ├── lawyers.py
│   ├── waitlist.py
│   └── admin.py
├── services/
│   ├── __init__.py
│   ├── auth.py
│   ├── database.py
│   └── chat_service.py
├── server.py
└── requirements.txt
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Cases
- `POST /api/cases` - Create case
- `GET /api/cases` - List cases
- `GET /api/cases/{id}` - Get case

### Chat
- `POST /api/chat` - Authenticated chat
- `POST /api/chat/guest` - Guest chat
- `GET /api/chat/history` - Chat history

### Lawyers
- `GET /api/lawyers` - List lawyers
- `POST /api/lawyer-applications` - Submit application

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/lawyer-applications` - List applications
- `PUT /api/admin/lawyer-applications/{id}/approve` - Approve
- `PUT /api/admin/lawyer-applications/{id}/reject` - Reject

---

## Test Credentials

### Admin Dashboard
- URL: `/admin-login`
- Email: `admin@nyaaysathi.com`
- Password: `admin123`

---

## Backlog

### P0 (Critical) - COMPLETED
- ✅ Fix Sign Up link redirection
- ✅ Backend refactoring

### P1 (High Priority)
- [ ] Break down `FindLawyer.js` into smaller components
- [ ] Replace dummy lawyer data with database integration

### P2 (Medium Priority)
- [ ] Lawyer profile management dashboard
- [ ] Case tracking system
- [ ] Appointment scheduling with calendar
- [ ] Email notifications

### P3 (Low Priority)
- [ ] Analytics dashboard for admins
- [ ] Rating and review system
- [ ] Document template library
- [ ] Multi-language support (Hindi/English)

---

## Known Limitations
- Lawyer data in `/frontend/src/data/lawyers.js` is MOCKED (static dummy data)
- No email verification flow
- No password reset functionality
