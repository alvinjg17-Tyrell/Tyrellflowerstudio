# TYRELL Florería - Product Requirements Document

## Original Problem Statement
Create a professional and elegant website for "TYRELL" flower shop with:
- Modern design with soft, floral aesthetic
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
2. Admin panel with authentication for CRUD operations
3. WhatsApp integration for order requests
4. File upload for images and videos
5. Responsive mobile design

## Implemented Features (as of Feb 19, 2026)

### Landing Page
- [x] Header with logo and navigation
- [x] Hero section with video/image background
- [x] About section with stats and circular icons
- [x] Services section with product cards and image carousels
- [x] Catalog links section
- [x] Contact section with WhatsApp link
- [x] Footer
- [x] Floating WhatsApp button with default message

### Admin Panel (/admin)
- [x] **Authentication** - Login required (tyrellflowerstudio@gmail.com)
- [x] Brand settings (name, tagline, WhatsApp number)
- [x] Header section editor (top bar, navigation)
- [x] Hero section editor (title, subtitle, video/image)
- [x] About section editor
- [x] Services CRUD (add, edit, delete products)
- [x] Services section titles editor
- [x] Catalog links management
- [x] Contact information editor
- [x] Footer editor

### Technical Features
- [x] Image upload to server
- [x] Video upload support
- [x] Multiple images per service (carousel)
- [x] MongoDB database integration
- [x] JWT authentication for admin

### UX Features
- [x] **Image Lightbox**: Click service images to view in full-size modal with navigation
- [x] **Auto-scroll Carousel**: Service images auto-scroll every 5 seconds
- [x] **WhatsApp Default Message**: All catalog buttons send "Hola Tyrell quisiera información sobre ..."
- [x] **Floating WhatsApp Button**: Green button at bottom-right of page

### Styling (Feb 19, 2026)
- [x] **Perfectly Vintages Font**: Serif vintage typography applied globally
- [x] **New Color Palette**:
  - Verde oliva: #4F6D5E (primary text)
  - Rosa empolvado: #D8A7B1
  - Nude durazno: #E8C1B5
  - Marfil cálido: #F5F1EB (background)
  - Rosa viejo: #B76E79
  - Dorado: #daa609 (accents, buttons)
- [x] **Service tags removed** (POPULAR, EXCLUSIVO no longer displayed)
- [x] **Circular Icons** in About section

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, Python, JWT Auth
- **Database**: MongoDB
- **Fonts**: Perfectly Vintages (CDNFonts), Playfair Display (fallback)
- **File Storage**: Local uploads directory

## Color Palette
| Color | Hex | Use |
|-------|-----|-----|
| Verde Oliva | #4F6D5E | Primary text, dark sections |
| Rosa Empolvado | #D8A7B1 | Highlights, icons |
| Nude Durazno | #E8C1B5 | Accents |
| Marfil Cálido | #F5F1EB | Backgrounds |
| Rosa Viejo | #B76E79 | Top bar, buttons |
| Dorado | #DAA609 | CTAs, accents |

## API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `GET /api/content` - Fetch all site content
- `PUT /api/content` - Update site content (auth required)
- `GET /api/services` - List all services
- `POST /api/services` - Create service (auth required)
- `PUT /api/services/{id}` - Update service (auth required)
- `DELETE /api/services/{id}` - Delete service (auth required)
- `POST /api/upload` - Upload file

## Admin Credentials
- Email: tyrellflowerstudio@gmail.com
- Password: 897355

## Backlog / Future Enhancements
- [ ] Password reset functionality
- [ ] Multiple admin users
- [ ] Order tracking system
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Multi-language support
