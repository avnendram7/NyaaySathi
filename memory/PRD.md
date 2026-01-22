# Nyaay Sathi - Legal Tech Platform PRD

## Original Problem Statement
Build a comprehensive legal-tech platform "Nyaay Sathi" that helps users find lawyers (both independent and from law firms), and enables lawyers and law firms to manage their practice. The platform supports three distinct user flows: Clients, Independent Lawyers, and Law Firms (with sub-roles: Lawyers and Managers).

## Architecture
```
/app
├── backend/
│   ├── models/       # Pydantic models
│   ├── routes/       # FastAPI routers (auth, admin, lawfirms, firm_lawyers, etc.)
│   ├── services/     # Business logic
│   └── server.py     # Main FastAPI app
├── frontend/
│   ├── src/
│   │   ├── components/ui/  # Shadcn components
│   │   ├── pages/          # All page components
│   │   └── App.js          # Routes
│   └── package.json
└── memory/
    └── PRD.md
```

## Implemented Features (as of Jan 2025)

### User/Client Features
- [x] Role selection page (Client / Lawyer / Law Firm) - 3 options at /role-selection
- [x] User Get Started page with 2 cards: "I Want a Lawyer" / "I Want a Law Firm" at /user-get-started
- [x] Client signup and login
- [x] Find Lawyer page with AI Assistant and Manual search options
- [x] Find Law Firm page with AI Assistant and Manual search options (with dummy data)
- [x] AI-powered lawyer/law firm search assistant
- [x] Manual lawyer/law firm search with filters
- [x] Client dashboard

### User Flow (Updated Jan 22, 2025)
1. Landing → Get Started → Role Selection (User/Lawyer/Law Firm)
2. User → User Get Started → "I Want a Lawyer" or "I Want a Law Firm"
3. Each option has: "Find with AI Assistant" and "Browse Manually"

### Independent Lawyer Features
- [x] Lawyer application form
- [x] Admin approval workflow
- [x] Lawyer login
- [x] Lawyer dashboard with Calendar, Messages, Stats

### Law Firm Features
- [x] Law Firm Role Selection (Lawyer / Manager)
- [x] **Firm Lawyer Application Flow (NEW)**
  - Step 1: Personal information
  - Step 2: Select law firm to join
  - Step 3: Professional details
- [x] Firm Lawyer login (after admin approval)
- [x] Firm Lawyer dashboard with tasks
- [x] Manager application form
- [x] Manager login and dashboard
- [x] Reports tab in Manager dashboard

### Admin Features
- [x] Admin login (/admin-login)
- [x] Lawyer applications tab
- [x] Law Firm applications tab  
- [x] **Firm Lawyer applications tab (NEW)**
- [x] Approve/Reject functionality for all application types

## Test Credentials
- **Admin:** admin@nyaaysathi.com / admin123
- **Dummy Firm Lawyers:** lawyer1@firm.com - lawyer5@firm.com / lawyer123
- **Pending Firm Lawyer Apps:** pending1@firm.com - pending3@firm.com / pending123

## Database Collections
- `users` - All user types (client, lawyer, law_firm, firm_lawyer)
- `lawyer_applications` - Independent lawyer applications
- `lawfirm_applications` - Law firm (manager) applications
- `firm_lawyer_applications` - Firm lawyer applications
- `firm_tasks` - Tasks assigned to firm lawyers
- `chat_history` - AI chat sessions

## API Endpoints
- POST /api/auth/login - User login
- POST /api/admin/login - Admin login
- POST /api/lawyer-applications - Submit lawyer application
- POST /api/lawfirm-applications - Submit law firm application
- POST /api/firm-lawyer-applications - Submit firm lawyer application
- GET /api/firm-lawyers/applications - Get all firm lawyer applications
- PUT /api/firm-lawyers/applications/{id}/status - Approve/Reject firm lawyer

## Next Tasks (Backlog)
- [ ] Manager can view and manage firm lawyers from their dashboard
- [ ] Task assignment from Manager to Firm Lawyers
- [ ] Real-time messaging (WebSockets)
- [ ] Video conferencing integration
- [ ] Rating and review system
- [ ] Lawyer comparison tool
- [ ] Payment integration
