# Lxwyer Up - Product Requirements Document

## Original Problem Statement
Build a premium legal services platform called "Lxwyer Up" (renamed from "Nyaay Sathi") with a modern, clean design inspired by "Nuwair VC" Dribbble post.

## Brand Identity
- **Name:** Lxwyer Up
- **Tagline:** Justice You Understand, Technology You Trust
- **Color Scheme:** Light backgrounds (white/off-white), Admiral Blue (#0F2944) for highlights and buttons, Black/charcoal for text

## Design Requirements
- Clean, spacious, minimal, and modern aesthetic
- High-quality, vibrant, contextually Indian imagery
- Smooth, elegant motion animations (scroll-based, fade-ins, hover effects)
- No fake statistics or marketing fluff

## Core Pages & Features

### Home Page (PremiumHome.js) ✅
- [x] Scattered, animated image layout in hero section
- [x] Tagline with blue underlines on key words
- [x] "Get Started" (blue) and "Free AI Assistant" (outlined) buttons
- [x] White navigation bar with black text and blue "Login" button
- [x] "Services we offer" section with expandable "View All" option
- [x] Login button leads to role-selection page (User, Lawyer, Law Firm)
- [x] Images display in natural, vibrant colors (no CSS filters)

### About Page (PremiumAbout.js) ✅
- [x] Clean layout, mission-focused content
- [x] Removed fake statistics

### Contact Page (PremiumContact.js) ✅
- [x] Basic implementation complete

## Technical Stack
- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** FastAPI
- **Database:** MongoDB
- **UI Components:** Shadcn/UI

## Architecture
```
/app
├── backend/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── PremiumHome.js
│   │   │   ├── PremiumAbout.js
│   │   │   └── PremiumContact.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## What's Been Implemented (Jan 2026)
- Website renamed from "Nyaay Sathi" to "Lxwyer Up"
- New premium pages created and routed
- Landing page redesign complete with animated scattered images
- Navigation bar styled with functional login button
- Services section with fast, smooth expansion animation
- Removed fake marketing statistics
- **Fixed:** Image color issue - removed all CSS filters and overlays

## Upcoming Tasks (P1)
- Redesign Login Pages to match Admiral Blue theme
- Redesign User/Law Firm Dashboards with new design language

## Future Tasks (P2)
- Finalize About & Contact pages with full Nuwair VC-inspired design
- Enhance chatbot functionality
- Implement lawyer comparison tool
- Integrate payment system

## Test Credentials
- See `/app/DUMMY_DATA_CREDENTIALS.md` for dummy user accounts
