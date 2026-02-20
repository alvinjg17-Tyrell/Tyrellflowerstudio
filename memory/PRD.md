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
- **Shop Owner**: Needs to manage products, prices, content, and colors without technical knowledge
- **Customers**: Looking for floral arrangements with easy ordering via WhatsApp

## Core Requirements
1. Public landing page with elegant design
2. Admin panel with authentication for CRUD operations
3. WhatsApp integration for order requests
4. File upload for images and videos
5. Responsive mobile design
6. Global color palette customization
7. Dynamic marketing sections

## Implemented Features (as of Feb 20, 2026)

### Landing Page
- [x] Header with logo and navigation
- [x] Hero section with video/image background (no Flower Studio label)
- [x] About section with stats and circular icons
- [x] Services section - **Horizontal carousel** with circular nav buttons
- [x] Dynamic sections for marketing campaigns
- [x] Catalog links section
- [x] Contact section with WhatsApp link
- [x] Footer
- [x] Floating WhatsApp button (real icon, higher position)

### Admin Panel (/admin)
- [x] **Authentication** - Login required (tyrellflowerstudio@gmail.com)
- [x] **COLORES tab** - Global color palette editor
- [x] **SECCIONES tab** - Dynamic sections manager
- [x] Brand settings (name, tagline, WhatsApp number)
- [x] Header section editor (top bar, navigation)
- [x] Hero section editor (title, subtitle, video/image)
- [x] About section editor
- [x] **PRODUCTOS tab** - Products CRUD with carousel preview
- [x] Catalog links management
- [x] Contact information editor
- [x] Footer editor

### Technical Features
- [x] Image upload with automatic optimization (Pillow)
- [x] Thumbnail generation for faster page loads
- [x] Video upload support with mobile fallback
- [x] Multiple images per service
- [x] MongoDB database integration
- [x] JWT authentication for admin
- [x] Color palette API endpoints
- [x] Dynamic sections API endpoints

### UX Features (Updated Feb 20, 2026)
- [x] **Horizontal Product Carousel**: E-commerce style layout
- [x] **Circular Navigation Buttons**: < and > for carousel navigation
- [x] **Swipeable Mobile**: Touch-friendly scroll on mobile
- [x] **Image Lightbox**: Click images to view full-size
- [x] **Real WhatsApp Icon**: Official WhatsApp SVG icon
- [x] **Beige Gold Highlight**: Hero text uses beige gold (#D4B896)
- [x] **Consistent Header**: Pink/burgundy background on scroll with white logo

### Styling
- [x] **Perfectly Vintages Font**: Serif vintage typography
- [x] **Customizable Color Palette** via admin:
  - Primary (Buttons): #daa609
  - Primary Hover: #b8890a
  - Secondary (Header): #B76E79
  - Accent: #D4B896
  - Text: #1a1a1a
  - Text Light: #4F6D5E
  - Background: #F5F1EB
  - Rose: #D8A7B1
  - Nude: #E8C1B5

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, Python, JWT Auth, Pillow
- **Database**: MongoDB
- **Fonts**: Perfectly Vintages (CDNFonts), Playfair Display (fallback)
- **File Storage**: Local uploads directory with optimization

## API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `GET /api/content` - Fetch all site content (includes colorPalette, dynamicSections)
- `PUT /api/content` - Update site content
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service
- `GET /api/color-palette` - Get color palette
- `PUT /api/color-palette` - Update color palette
- `GET /api/dynamic-sections` - List dynamic sections
- `POST /api/dynamic-sections` - Create section
- `PUT /api/dynamic-sections/{id}` - Update section
- `DELETE /api/dynamic-sections/{id}` - Delete section
- `POST /api/upload` - Upload file (returns optimized URL + thumbnail)

## Admin Credentials
- Email: tyrellflowerstudio@gmail.com
- Password: 897355

## Backlog / Future Enhancements (P1)
- [ ] Apply color palette changes to all frontend components dynamically
- [ ] Product images preview in real-size in admin
- [ ] Password reset functionality
- [ ] Multiple admin users

## Future Tasks (P2)
- [ ] Order tracking system
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Multi-language support
