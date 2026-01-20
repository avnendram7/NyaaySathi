# Nyaay Sathi - Legal Tech Platform PRD

## Overview
A comprehensive legal-tech platform serving Clients, Lawyers, and Law Firms in India.

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, lucide-react
- **Backend**: FastAPI, Python, Pydantic
- **Database**: MongoDB
- **AI**: Gemini via emergentintegrations

---

## All User Flows (Complete)

### 1. Client Flow
- **Get Started** → `/user-signup` → Create Account → `/user-dashboard`
- **Login** → `/user-login` → Dashboard
- **Find Lawyer** → Manual Search or AI Chat → Book Consultation → Signup

### 2. Lawyer Flow
- **Get Started** → `/lawyer-application` → 4-Step Form → Admin Approval → Login
- **Login** → `/lawyer-login` → `/lawyer-dashboard`

### 3. Law Firm Flow
- **Get Started** → `/lawfirm-application` → 4-Step Form → Admin Approval → Login
- **Login** → `/lawfirm-login` → `/lawfirm-dashboard`

### 4. Admin Flow
- **Login** → `/admin-login` → `/admin`
- Review & Approve/Reject Lawyer Applications
- Review & Approve/Reject Law Firm Applications

---

## Admin Dashboard Features

| Section | Features |
|---------|----------|
| **Lawyer Applications** | View all lawyer apps, Filter by status, Approve/Reject, View details modal |
| **Law Firm Applications** | View all firm apps, Filter by status, Approve/Reject, View details modal |
| **Stats Cards** | Pending, Approved, Rejected counts for each section |
| **Tab Navigation** | Switch between Lawyer and Law Firm applications with badge counters |

---

## Complete Feature Matrix

| User Type | Dashboard | Cases | Calendar | Messages | Documents | Analytics | Settings |
|-----------|-----------|-------|----------|----------|-----------|-----------|----------|
| Client | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ |
| Lawyer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Law Firm | ✅ | ✅ | ✅ | ✅ | - | ✅ | ✅ |
| Admin | ✅ Lawyer Apps | ✅ Law Firm Apps | - | - | - | - | - |

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

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/lawyer-applications` - List lawyer applications
- `PUT /api/admin/lawyer-applications/{id}/approve` - Approve lawyer
- `PUT /api/admin/lawyer-applications/{id}/reject` - Reject lawyer
- `GET /api/admin/lawfirm-applications` - List law firm applications
- `PUT /api/admin/lawfirm-applications/{id}/approve` - Approve law firm
- `PUT /api/admin/lawfirm-applications/{id}/reject` - Reject law firm

---

## Current Status: FULLY FUNCTIONAL

All features implemented:
- ✅ Client signup, login, dashboard
- ✅ Lawyer application, approval, login, dashboard
- ✅ Law Firm application, approval, login, dashboard
- ✅ Admin dashboard with dual section (Lawyers + Law Firms)
- ✅ 1000 dummy lawyers with Indian data
- ✅ AI chatbot with lawyer recommendations
- ✅ All dashboard tabs functional with dummy data
