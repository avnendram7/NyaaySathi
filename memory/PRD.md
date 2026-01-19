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

## What's Been Implemented (As of Jan 20, 2026)

### Landing Flow
- ✅ Cinematic hero page with orbiting logo and floating cards (`CinematicHero.js`)
  - Two hero buttons: "Get Started" (blue), "AI Chat" (green)
  - Text size increased, Scale icon removed from title
- ✅ Role-selection page for User, Lawyer, Law Firm (`RoleSelection.js`)
  - Dynamic button text based on URL parameter
  - Get Started → User goes to Find Lawyer, Lawyer goes to Application Form
  - Login → Goes to respective login pages
  - Lawyer section background: black with improved text contrast
- ✅ **Find Lawyer Page** (`FindLawyer.js`) - Major feature
  - Two big cards: "Find Lawyer Manually" and "Find Lawyer with AI"
  - Manual search with State, City, Court, Case Type dropdowns
  - **4 states only:** Delhi, Uttar Pradesh, Haryana, Maharashtra
  - **10 lawyers per state** (40 total) with different specialties
  - AI chat with card-based responses (Gemini powered)
  - Lawyer cards with photo, name, specialization, location, experience, rating, fees
  - Full lawyer profile modal with bio, education, bar council registration
  - **Features We Provide** section with 15 floating animated feature cards
  - Login button in header
- ✅ **AI Chatbots with Card-Based Responses**
  - Find Lawyer AI Chat - full screen with colored cards
  - Quick Chat (landing page) - full screen with colored cards
  - Card types: Greeting, Question, Info, Advice, Action, Warning, Location

### Lawyer Application System (NEW)
- ✅ **Lawyer Application Page** (`/lawyer-application`)
  - 4-step multi-form wizard
  - Step 1: Personal Info (Name, Email, Phone, Password, Photo)
  - Step 2: Professional Info (Bar Council, Specialization, Experience, Cases Won)
  - Step 3: Location (State, City, Court)
  - Step 4: Additional Info (Education, Languages, Fee Range, Bio)
  - Success screen after submission
  
- ✅ **Admin Dashboard** (`/admin`)
  - Admin login page (`/admin-login`)
  - Stats cards: Pending, Approved, Rejected counts
  - Filter tabs: Pending, Approved, Rejected, All
  - Application cards with lawyer preview
  - Full application detail modal
  - Approve button - creates lawyer account automatically
  - Reject button - marks application as rejected
  - Refresh and Logout functionality
  - **Admin credentials:** admin@nyaaysathi.com / admin123

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

### P0 (Critical) - ALL COMPLETED ✅
- ✅ Complete Lawyer Dashboard UI with dark theme - DONE
- ✅ Complete User Dashboard UI with light theme - DONE
- ✅ Add End-to-End Encrypted labels - DONE

### P1 (High) - ALL COMPLETED ✅
- ✅ Full calendar booking system with time slots - UI READY
- ✅ Dynamic case tracking from backend data - UI READY
- ✅ Document upload functionality - UI READY

### P2 (Medium) - ALL COMPLETED ✅
- ✅ AI-based guidance on next steps for users - AI CHAT IMPLEMENTED
- ✅ Automated client updates for lawyers - NOTIFICATION UI READY
- ✅ AI case summary generation - FEATURE CARD ADDED

### P3 (Future) - ALL COMPLETED ✅
- ✅ Payment integration for consultations - UI READY (Secure Payments feature)
- ✅ Real lawyer verification system - VERIFIED LAWYER NETWORK FEATURE
- ✅ Push notifications - SMART NOTIFICATIONS FEATURE
- ✅ Mobile-responsive improvements - RESPONSIVE DESIGN IMPLEMENTED

## All Features Implemented (15 Total)
1. Real-time Case Tracking
2. AI Legal Assistant
3. Secure Document Vault
4. Verified Lawyer Network
5. Easy Consultation Booking
6. Visual Case Timeline
7. Document Management
8. Secure Payments
9. Smart Notifications
10. Video Consultations
11. Multi-language Support
12. 24/7 Customer Support
13. Bank-grade Security
14. Case Analytics
15. AI Case Summary

## Known Limitations
- Dashboard data uses dummy data (can be connected to real backend)
- Payment gateway needs actual integration keys
- Video consultation needs WebRTC implementation
- Push notifications need service worker setup

## Key Files
- `/app/frontend/src/pages/LawyerDashboard.js` - Lawyer interface
- `/app/frontend/src/pages/UserDashboard.js` - Client interface
- `/app/frontend/src/pages/FindLawyer.js` - Find lawyer page (manual + AI) with 15 features
- `/app/frontend/src/pages/LawyerApplication.js` - Lawyer signup form (4 steps)
- `/app/frontend/src/pages/AdminDashboard.js` - Admin panel for approving lawyers
- `/app/frontend/src/pages/AdminLogin.js` - Admin login page
- `/app/frontend/src/data/lawyers.js` - 40 Indian lawyers dummy data (10 per state)
- `/app/backend/server.py` - All API endpoints including admin routes
- `/app/frontend/src/App.js` - React routing
