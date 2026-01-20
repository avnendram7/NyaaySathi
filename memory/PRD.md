# Nyaay Sathi - Legal Tech Platform PRD

## Overview
A comprehensive legal-tech platform serving Clients, Lawyers, and Law Firms in India.

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, lucide-react
- **Backend**: FastAPI, Python, Pydantic
- **Database**: MongoDB
- **AI**: Gemini via emergentintegrations

---

## User Flows (All Complete)

### 1. Client Flow
- **Get Started** → `/user-signup` → Create Account → `/user-dashboard`
- **Login** → `/user-login` → Dashboard
- **Find Lawyer** → `/find-lawyer` → Manual Search or AI Chat → Book Consultation → Signup

### 2. Lawyer Flow
- **Get Started** → `/lawyer-application` → 4-Step Form → Admin Approval → Login
- **Login** → `/lawyer-login` → `/lawyer-dashboard`

### 3. Law Firm Flow (NEW)
- **Get Started** → `/lawfirm-application` → 4-Step Form → Admin Approval → Login
- **Login** → `/lawfirm-login` → `/lawfirm-dashboard`

---

## Law Firm Dashboard Features (All Complete)

| Tab | Status | Features |
|-----|--------|----------|
| Dashboard | ✅ | Firm stats, Upcoming hearings, Recent activity, Top lawyers, Client messages |
| Our Lawyers | ✅ | 8 lawyers grid with photos, specializations, ratings, status badges |
| Cases | ✅ | Case management table with clients, lawyers, status, priority |
| Calendar | ✅ | Interactive calendar, Weekly events, Firm-wide schedule |
| Messages | ✅ | Client conversations, Team chat, Real-time messaging |
| Analytics | ✅ | Revenue tracking, Lawyer performance, YTD stats |
| Settings | ✅ | Firm profile, Subscription status |

---

## All Dashboard Features (Complete)

### Client Dashboard
- AI Chat, Find Lawyers, Bookings, Documents, Profile

### Lawyer Dashboard  
- Dashboard, Cases, Calendar, Messages, Documents, Lawyer Network, Earnings

### Law Firm Dashboard
- Dashboard, Our Lawyers, Cases, Calendar, Messages, Analytics, Settings

---

## Test Credentials

| User Type | Email | Password | URL |
|-----------|-------|----------|-----|
| Admin | admin@nyaaysathi.com | admin123 | /admin-login |
| Lawyer | testlawyer@nyaaysathi.com | lawyer123 | /lawyer-login |
| Client | testclient123@example.com | test123456 | /user-login |
| Law Firm | testlawfirm@nyaaysathi.com | firm123 | /lawfirm-login |

---

## API Endpoints

### Law Firm Specific (NEW)
- `POST /api/lawfirm-applications` - Submit law firm application
- `GET /api/lawfirms` - Get approved law firms
- `GET /api/admin/lawfirm-applications` - Admin: List law firm applications
- `PUT /api/admin/lawfirm-applications/{id}/approve` - Admin: Approve
- `PUT /api/admin/lawfirm-applications/{id}/reject` - Admin: Reject

---

## Files Structure

```
/app/frontend/src/pages/
├── LawFirmApplication.js  # NEW - 4-step registration form
├── LawFirmDashboard.js    # UPDATED - Full dashboard with all tabs
├── LawFirmLoginPage.js    # UPDATED - Sign Up → Application
├── LawyerLoginPage.js     # UPDATED - Sign Up → Application
├── UserSignupPage.js      # Client signup page
└── ...

/app/backend/routes/
├── lawfirms.py            # NEW - Law firm routes
├── admin.py               # UPDATED - Law firm approval routes
└── ...
```

---

## Current Status: FULLY FUNCTIONAL

All three user types (Client, Lawyer, Law Firm) have complete flows:
- ✅ Registration/Application
- ✅ Login
- ✅ Full Featured Dashboard
- ✅ Admin Approval (for Lawyer & Law Firm)

---

## Data Notes
- **Lawyers**: 1000 dummy lawyers (MOCKED) + approved from DB (REAL)
- **Law Firms**: Dummy firm data with 8 lawyers, 6 cases (MOCKED)
- **All Indian names and realistic scenarios**
