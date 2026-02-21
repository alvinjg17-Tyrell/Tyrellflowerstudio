# TYRELL Florería - Product Requirements Document

## Original Problem Statement
Create a professional and elegant website for "TYRELL" flower shop with full CMS admin panel.

## Implemented Features (as of Feb 21, 2026)

### Bug Fixes (Session)
- **Fixed product images not loading:** Images stored with old domain URLs now load correctly via URL normalization
- **Removed yellow "back to top" button:** The button behind WhatsApp has been removed from Footer.js
- **Badge "Made with Emergent" hidden:** CSS added to hide the injected badge

### NEW: Drag & Drop Product Reordering
- Products within categories can now be reordered via drag & drop
- Works on mobile (touch hold) and desktop (click and drag)
- Visual "ARRASTRA" handle indicator on each product card

### NEW: Carousel Navigation Buttons
- Added `<` and `>` navigation buttons in admin panel
- Allows scrolling through products when there are more than 3

### Category-Based Products System
The products section has been restructured with:
- **Categories**: Ramos, Ramos con Rosas, Flower Box, etc.
- **Products per Category**: Each category contains multiple products
- **Horizontal Carousel per Category**: Each category displays its products in a swipeable carousel
- **Individual Product Names**: Each product has its own name, image, and price
- **WhatsApp Integration**: "Pedir" button sends message with specific product name

### Admin Panel - Products Tab
- Create/edit/delete product categories
- Add multiple products to each category
- Upload product images with **position controls** (horizontal/vertical sliders)
- Set product name and price
- Live preview showing how products will appear on the page
- Collapsible category sections for easy management

### Product Card Features
- Image with customizable position (object-position)
- Product name below image
- Optional price
- "Pedir" button linking to WhatsApp with product name

### Color Customization
All sections have inline color pickers:
- **ENCABEZADO**: Top bar colors, CTA button colors
- **HERO**: Title, highlight, subtitle, button colors
- **PRODUCTOS**: Section title, highlight, "Pedir" button colors

### Other Features
- Removed "Entrega a domicilio disponible" from header
- Video mobile compatibility improved
- Dynamic marketing sections
- Global color palette editor

## API Endpoints
- `GET/POST/PUT/DELETE /api/categories` - Product categories CRUD
- Products are embedded in categories

## Database Schema

### product_categories collection
```json
{
  "id": "uuid",
  "name": "Ramos",
  "description": "Composiciones artísticas",
  "products": [
    {
      "id": "uuid",
      "name": "Ramo Primavera",
      "image": "url",
      "imagePosition": {"x": 50, "y": 50},
      "price": "S/. 120",
      "order": 0
    }
  ],
  "order": 0,
  "active": true,
  "created_at": "datetime"
}
```

## Admin Credentials
- Email: tyrellflowerstudio@gmail.com
- Password: 897355

## "Made with Emergent" Badge
**REMOVED** - Hidden via CSS in index.css (Feb 21, 2026)

## Backlog (P1)
- [ ] Drag-and-drop product reordering
- [ ] Bulk image upload
- [ ] Add color pickers to About, Contact, Footer sections

## Future Tasks (P2)
- [ ] Order tracking system
- [ ] Analytics integration
