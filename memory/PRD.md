# Nyaay Sathi - Legal Tech Platform PRD

## Original Problem Statement
Build a legal-tech startup platform called "Nyaay Sathi" that simplifies the justice system for both clients and lawyers using technology and AI.

## Core Features

### Platform for Clients
- Understand case status in simple language
- Track case status, stage, and timelines
- Get AI-based guidance on next steps
- Upload and manage legal documents
- AI chatbot (Gemini Pro) for basic legal clarity
- Book consultations with verified lawyers
- Personalized dashboard

### Platform for Lawyers
- Client and case management tools
- Automated updates to clients
- Time-saving structured case summaries
- Professional dashboard
- Lawyer Network for collaboration (end-to-end encrypted)
- Document management (end-to-end encrypted)
- Earnings & billing tracking

### General Features
- Pages: Home, About, How It Works, Features, For Clients, For Lawyers, Contact/Waitlist
- Separate login/signup for User, Lawyer, Law Firm roles
- Color Theme: Dark mode for lawyers, Light mode for users
- India-specific dummy data dated 2026
- Contact: avnendram.7@gmail.com, +91 8318216968, Sonipat, India

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Authentication:** JWT
- **AI Integration:** Gemini Pro via Emergent LLM Key

## What's Been Implemented (As of Jan 19, 2026)

### Landing Flow
- ✅ Cinematic hero page with orbiting logo and floating cards (`CinematicHero.js`)
  - Two hero buttons: "Get Started" (blue), "AI Chat" (green)
  - Text size increased, Scale icon removed from title
- ✅ Role-selection page for User, Lawyer, Law Firm (`RoleSelection.js`)
  - Dynamic button text based on URL parameter
  - Get Started → shows "GET STARTED" buttons, User goes to Find Lawyer page
  - Login → shows "LOGIN" buttons, User goes to Login page
  - Lawyer section background: black with improved text contrast
- ✅ **Find Lawyer Page** (`FindLawyer.js`) - Major feature
  - Two big cards: "Find Lawyer Manually" and "Find Lawyer with AI"
  - Manual search with State, City, Court, Case Type dropdowns
  - **4 states only:** Delhi, Uttar Pradesh, Haryana, Maharashtra
  - **10 lawyers per state** (40 total) with different specialties
  - AI chat interface powered by Gemini for smart lawyer matching
  - Lawyer cards with photo, name, specialization, location, experience, rating, fees
  - Full lawyer profile modal with bio, education, bar council registration
  - "Book Consultation" and "Send Message" actions
  - **Features We Provide** section with 6 floating animated cards:
    - Real-time Case Tracking
    - AI Legal Assistant  
    - Secure Document Vault
    - Verified Lawyer Network
    - Easy Consultation Booking
    - Visual Case Timeline
  - "Client Login" CTA at bottom
- ✅ **Floating Features Section** - "Core Capabilities" with 4 service cards below hero
- ✅ **Practice Areas Section** - 3 case study cards with success rates
- ✅ **Why Choose Us Section** - 3 key differentiators
- ✅ **Final CTA Section** - Call to action with footer

### Navbar
- ✅ Login button with floating light orbs animation
- ✅ Removed Scale icon, just "Nyaay Sathi" text

### Authentication & Roles
- ✅ 3-role authentication system (User, Lawyer, Law Firm)
- ✅ Separate login/signup flows and dashboards
- ✅ JWT-based authentication with 30-day expiry

### Dashboards
- ✅ **Lawyer Dashboard (Dark Theme):**
  - Dashboard: Stats, schedule, messages
  - Cases: Case management table with stats
  - Calendar: Placeholder
  - Messages: End-to-End Encrypted label
  - Documents: End-to-End Encrypted label, document list
  - Lawyer Network: End-to-End Encrypted group chat with discussions
  - Earnings: Billing history and revenue stats

- ✅ **User Dashboard (Light Theme):**
  - Dashboard: Next hearing, documents required, timeline
  - Consultation: Find lawyers, AI matching
  - ChatBot: AI legal assistant (Gemini Pro)
  - Documents: Document list

### AI Integration
- ✅ Gemini Pro chatbot (authenticated and guest modes)
- ✅ Quick Chat page for guest access

### Static Pages
- ✅ About, Features, Contact, How It Works, For Clients, For Lawyers

### Backend API
- ✅ Health check: GET /api/health
- ✅ Auth: POST /api/auth/register, /api/auth/login
- ✅ Cases: GET, POST /api/cases
- ✅ Bookings: GET, POST /api/bookings
- ✅ Documents: GET /api/documents
- ✅ Lawyers: GET /api/lawyers
- ✅ Chat: POST /api/chat, /api/guest-chat
- ✅ Waitlist: POST /api/waitlist

## DB Schema
```
users: {id, email, password, full_name, user_type, phone, firm_name, created_at}
cases: {id, user_id, title, case_number, description, status, created_at, updated_at}
bookings: {id, client_id, lawyer_id, date, time, description, status, created_at}
documents: {id, case_id, user_id, title, file_url, file_type, uploaded_at}
waitlist: {id, email, full_name, message, created_at}
```

## Test Status
- Backend: 22/22 tests passed
- Frontend: All features working
- Test credentials:
  - Lawyer: testlawyer@example.com / password123
  - Client: newuser@example.com / password123

## Prioritized Backlog

### P0 (Critical)
- ✅ Complete Lawyer Dashboard UI with dark theme - DONE
- ✅ Complete User Dashboard UI with light theme - DONE
- ✅ Add End-to-End Encrypted labels - DONE

### P1 (High)
- [ ] Full calendar booking system with time slots
- [ ] Dynamic case tracking from backend data
- [ ] Document upload functionality

### P2 (Medium)
- [ ] AI-based guidance on next steps for users
- [ ] Automated client updates for lawyers
- [ ] AI case summary generation

### P3 (Future)
- [ ] Payment integration for consultations
- [ ] Real lawyer verification system
- [ ] Push notifications
- [ ] Mobile-responsive improvements

## Known Limitations
- Most dashboard data is hardcoded dummy data
- Calendar booking is a basic endpoint, not full calendar
- Document upload UI exists but file storage not implemented
- Law Firm dashboard is minimal

## Key Files
- `/app/frontend/src/pages/LawyerDashboard.js` - Lawyer interface
- `/app/frontend/src/pages/UserDashboard.js` - Client interface
- `/app/frontend/src/pages/FindLawyer.js` - Find lawyer page (manual + AI)
- `/app/frontend/src/data/lawyers.js` - 15 Indian lawyers dummy data
- `/app/backend/server.py` - All API endpoints
- `/app/frontend/src/App.js` - React routing
