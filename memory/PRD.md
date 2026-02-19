# TYRELL Florería - Product Requirements Document

## Original Problem Statement
Create a professional and elegant website for "TYRELL" flower shop with:
- Modern design with soft, floral aesthetic (gold and white colors)
- Homepage with hero, services, catalog links, contact sections
- Full CMS admin panel for managing all content
- WhatsApp integration for orders
- Image/video upload capabilities
- Responsive design for mobile devices

## User Personas
- **Shop Owner**: Needs to manage products, prices, and content without technical knowledge
- **Customers**: Looking for floral arrangements with easy ordering via WhatsApp

## Core Requirements
1. Public landing page with elegant design
2. Admin panel for CRUD operations on all content
3. WhatsApp integration for order requests
4. File upload for images and videos
5. Responsive mobile design

## Implemented Features (as of Feb 19, 2026)

### Landing Page
- [x] Header with logo and navigation
- [x] Hero section with video/image background
- [x] About section with stats
- [x] Services section with product cards
- [x] Catalog links section
- [x] Contact section with WhatsApp link
- [x] Footer

### Admin Panel (/admin)
- [x] Brand settings (name, tagline, WhatsApp number)
- [x] Hero section editor (title, subtitle, video/image)
- [x] About section editor
- [x] Services CRUD (add, edit, delete products)
- [x] Catalog links management
- [x] Contact information editor

### Technical Features
- [x] Image upload to server
- [x] Video upload support
- [x] Multiple images per service (carousel)
- [x] MongoDB database integration

### Latest Updates (Feb 19, 2026)
- [x] **Image Lightbox**: Click service images to view in full-size modal with navigation
- [x] **Auto-scroll Carousel**: Service images auto-scroll every 5 seconds
- [x] **WhatsApp Default Message**: "Ver Catálogo" buttons now send "Hola Tyrell quisiera información sobre ..."
- [x] **Service-specific WhatsApp**: "Pedir" buttons include product name in message

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **File Storage**: Local uploads directory

## API Endpoints
- `GET /api/content` - Fetch all site content
- `PUT /api/content` - Update site content
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service
- `POST /api/upload` - Upload file

## File Structure
```
/app
├── backend/
│   ├── server.py (FastAPI app)
│   ├── uploads/ (uploaded files)
│   └── .env
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── landing/ (public page components)
│       │   ├── admin/ (admin panel components)
│       │   └── ui/ (shadcn components)
│       ├── pages/
│       │   ├── LandingPage.js
│       │   └── AdminPage.js
│       └── lib/api.js
└── memory/
    └── PRD.md
```

## Backlog / Future Enhancements
- [ ] Authentication for admin panel
- [ ] Order tracking system
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Multi-language support
