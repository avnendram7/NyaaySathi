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

### January 20, 2026 (Latest)
**Major Feature: Enhanced Lawyer Search & AI Recommendations**
- Expanded dummy lawyer data from 40 to **1000 lawyers**
  - 12 Indian states with multiple cities each
  - 20 legal specializations (at least 50 lawyers per type)
  - Proper distribution across states
- Added **text search bar** for manual lawyer search
  - Search by name, specialization, city, state, or bio
- **Approved lawyers from DB** now appear in search results
  - Verified lawyers show green shield badge
  - DB lawyers appear first in results, sorted by rating
- **AI Chatbot Enhanced**
  - Conversational flow to understand legal issue
  - Maintains session for multi-turn conversations
  - Recommends specific lawyers by ID
  - Shows lawyer cards when AI recommends them
- **Book Consultation → Signup**
  - Non-logged-in users redirected to `/role-selection` when booking

### January 19, 2026
**P0 Fix: Sign Up Link Redirection**
- Updated login pages to redirect "Sign Up" to `/role-selection`
- Simplified login pages to login-only forms

**P1 Task: Backend Refactoring (COMPLETED)**
- Refactored monolithic `server.py` (695 lines → 75 lines)
- Created modular structure with models, routes, services

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

/app/frontend/src/
├── data/
│   └── lawyers.js  # 1000 dummy lawyers
├── pages/
│   ├── FindLawyer.js  # Main search + AI chat
│   └── ...
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Lawyers
- `GET /api/lawyers` - List all approved lawyers (from DB)
- `POST /api/lawyer-applications` - Submit lawyer application

### Chat
- `POST /api/chat` - Authenticated chat
- `POST /api/chat/guest` - Guest chat (AI assistant)

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

## Current Feature Status

### ✅ Completed
- Sign Up links redirect to role selection
- Backend modular refactoring
- 1000 dummy lawyers with proper distribution
- Text search bar for lawyer search
- Approved lawyers appear in search (with verified badge)
- AI chatbot with conversational flow
- Book consultation redirects to signup for non-logged users

### 🟡 Data Notes
- Lawyer data in `/frontend/src/data/lawyers.js` is **MOCKED** (generated dummy data)
- Approved lawyers from database are **REAL** and marked as verified

---

## Backlog

### P1 (High Priority)
- [ ] Break down `FindLawyer.js` into smaller components
- [ ] Add lawyer profile edit page for approved lawyers
- [ ] Implement actual booking system with calendar

### P2 (Medium Priority)
- [ ] Case tracking system for clients
- [ ] Email notifications for bookings
- [ ] Payment integration for consultations

### P3 (Low Priority)
- [ ] Analytics dashboard for admins
- [ ] Rating and review system after consultation
- [ ] Document template library
- [ ] Multi-language support (Hindi/English toggle)

---

## Known Limitations
- Lawyer photos use randomuser.me (placeholder images)
- No real payment integration yet
- No email verification flow
- No password reset functionality
