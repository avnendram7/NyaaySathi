# Nyaay Sathi - Legal Tech Platform PRD

## Original Problem Statement
Build a legal-tech platform with role-based access, AI-powered legal assistant, lawyer discovery/booking, and admin approval workflow.

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, lucide-react
- **Backend**: FastAPI, Python, Pydantic
- **Database**: MongoDB
- **AI**: Gemini via emergentintegrations

---

## Changelog

### January 20, 2026 (Latest Update)
**Client Signup & Booking Flow (COMPLETED)**
- Created `/user-signup` page for client registration
- Book Consultation button now redirects to client signup (not role selection)
- Signup page shows which lawyer the user wants to book
- After signup, user is automatically logged in and redirected to dashboard
- User can later login with the same credentials
- Login page "Sign Up" link now points to `/user-signup`

**Enhanced Lawyer Search (COMPLETED)**
- Expanded from 40 to **1000 dummy lawyers**
- Added **text search bar** for name, specialization, location
- Approved lawyers from DB appear with verified badge
- AI chatbot understands legal issues and recommends specific lawyers

### January 19, 2026
- Fixed Sign Up links on login pages
- Backend refactored into modular structure (models, routes, services)

---

## User Flows

### Client Booking Flow
1. User visits `/find-lawyer`
2. Searches for lawyers (manual or AI)
3. Clicks "Book Consultation" on lawyer profile
4. **If not logged in**: Redirected to `/user-signup`
   - Signup page shows "Sign up to book consultation with [Lawyer Name]"
   - User fills form and creates account
   - Automatically logged in and redirected to dashboard
5. **If logged in**: Redirected to user dashboard with booking info

### Lawyer Application Flow
1. Lawyer visits `/role-selection` → clicks "I am a Lawyer"
2. Redirected to `/lawyer-application` (multi-step form)
3. Admin reviews at `/admin` dashboard
4. If approved → Lawyer account created → Can login at `/lawyer-login`

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | CinematicHero | Landing page |
| `/find-lawyer` | FindLawyer | Lawyer search (manual + AI) |
| `/user-signup` | UserSignupPage | **NEW** - Client registration |
| `/user-login` | UserLoginPage | Client login |
| `/user-dashboard` | UserDashboard | Client dashboard |
| `/lawyer-login` | LawyerLoginPage | Lawyer login |
| `/lawyer-dashboard` | LawyerDashboard | Lawyer dashboard |
| `/lawyer-application` | LawyerApplication | Lawyer signup form |
| `/admin-login` | AdminLogin | Admin login |
| `/admin` | AdminDashboard | Admin dashboard |
| `/role-selection` | RoleSelection | Role picker (User/Lawyer/Law Firm) |

---

## Test Credentials

### Admin Dashboard
- URL: `/admin-login`
- Email: `admin@nyaaysathi.com`
- Password: `admin123`

### Test Client Account
- URL: `/user-login`
- Email: `testclient123@example.com`
- Password: `test123456`

---

## Current Feature Status

### ✅ Completed
- Client signup page with booking context
- Book Consultation → Signup → Login flow
- 1000 dummy lawyers with proper distribution
- Text search bar for lawyer search
- Approved lawyers appear in search with verified badge
- AI chatbot with lawyer recommendations
- Backend modular refactoring

### 🟡 Data Notes
- Lawyer data in `/frontend/src/data/lawyers.js` is **MOCKED**
- Approved lawyers from database are **REAL** and marked as verified

---

## Backlog

### P1 (High Priority)
- [ ] Implement actual booking system with calendar
- [ ] Add lawyer profile edit page for approved lawyers
- [ ] Break down large FindLawyer.js into smaller components

### P2 (Medium Priority)
- [ ] Case tracking system for clients
- [ ] Email notifications for bookings
- [ ] Payment integration for consultations

### P3 (Low Priority)
- [ ] Analytics dashboard for admins
- [ ] Rating and review system
- [ ] Document template library
