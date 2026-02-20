# TYRELL Florería - Product Requirements Document

## Original Problem Statement
Create a professional and elegant website for "TYRELL" flower shop with:
- Modern design with soft, floral aesthetic
- Homepage with hero, services, catalog links, contact sections
- Full CMS admin panel for managing all content
- WhatsApp integration for orders
- Image/video upload capabilities
- Responsive design for mobile devices
- **Full color customization** from admin panel

## Implemented Features (as of Feb 20, 2026)

### Landing Page
- [x] Header with logo and navigation
- [x] Hero section with video/image background
- [x] About section with stats and circular icons
- [x] Services section - Horizontal carousel with circular nav buttons
- [x] Dynamic sections for marketing campaigns
- [x] Catalog links section
- [x] Contact section with WhatsApp link
- [x] Footer
- [x] Floating WhatsApp button (real icon)

### Admin Panel (/admin) - Color Customization
- [x] **ENCABEZADO tab**: 
  - Top bar background & text colors
  - CTA button (VER CATÁLOGO) background & text colors
  - Live preview
- [x] **HERO tab**:
  - Title line 1 color
  - Highlighted title (line 2) color
  - Subtitle color
  - Primary button background & text colors
  - Secondary button border color
  - Live preview
- [x] **PRODUCTOS tab**:
  - Section label color
  - Title color
  - Highlighted word color
  - Subtitle color
  - "Pedir" button background & text colors
  - Live preview
- [x] **COLORES tab** - Global color palette editor
- [x] **SECCIONES tab** - Dynamic marketing sections

### Technical Features
- [x] Image upload with automatic optimization (Pillow)
- [x] Thumbnail generation for faster page loads
- [x] Video upload support with mobile fallback
- [x] Inline color pickers with preset palette
- [x] MongoDB database integration
- [x] JWT authentication for admin

## Color Palette (Editable from Admin)
| Element | Default Color | Location |
|---------|---------------|----------|
| Top Bar BG | #B76E79 | Encabezado |
| Top Bar Text | #FFFFFF | Encabezado |
| CTA Button | #daa609 | Encabezado, Hero |
| Hero Title | #FFFFFF | Hero |
| Hero Highlight | #D4B896 | Hero |
| Section Title | #1a1a1a | Productos |
| Section Highlight | #daa609 | Productos |
| Pedir Button | #daa609 | Productos |

## API Endpoints
- `GET/PUT /api/color-palette` - Global color palette
- `GET/POST/PUT/DELETE /api/dynamic-sections` - Dynamic sections
- All content endpoints support color fields

## Admin Credentials
- Email: tyrellflowerstudio@gmail.com
- Password: 897355

## Regarding "Made with Emergent" Badge
Contact Emergent support (Discord or email) for removal options. Include:
- Job ID
- Specific request
- Reasons for removal

## Backlog (P1)
- [ ] Add color pickers to About, Contact, Footer sections
- [ ] Product preview in real-size in admin
- [ ] Password reset functionality

## Future Tasks (P2)
- [ ] Order tracking system
- [ ] Analytics integration
- [ ] Multi-language support
