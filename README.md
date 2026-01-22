# Naqsh Resort - Booking Website

A boutique resort booking website for **Naqsh Resort**, a 12-room property located in Mohanchatti, Rishikesh. Built with a focus on direct bookings, honest pricing, and conversion-first design.

🌐 **Live Site:** [Coming Soon]

---

## About the Project

This is the official booking website for Naqsh Resort, designed to:

- Accept direct room bookings (no OTA dependency)
- Handle group trip / full property buyouts
- Provide transparent pricing with no hidden charges
- Convert visitors into guests with trust-building design

### Business Context

- **Property:** 12 rooms across 3 categories
- **Location:** Mohanchatti, Rishikesh, Uttarakhand
- **USP:** Valley views, peaceful location away from tourist chaos
- **Target:** Couples, families, friend groups, corporate offsites

---

## Tech Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Styling  | Custom CSS with CSS Variables   |
| Fonts    | Google Fonts (Lora, Nunito)     |
| Backend  | Node.js, Express.js _(planned)_ |
| Database | MongoDB _(planned)_             |

---

## Project Structure

```
naqsh-resort/
├── index.html          # Homepage
├── rooms.html          # Room listings & pricing
├── group-booking.html  # Full property booking
├── contact.html        # Contact & location
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Resort photos
└── README.md
```

---

## Pages

### 1. Homepage (`index.html`)

- Hero section with CTA
- Availability checker (Room / Group toggle)
- "Why Naqsh?" value propositions
- Testimonials with Google rating
- Footer with contact info

### 2. Rooms (`rooms.html`)

- 3 room categories with photos
- Weekday & weekend pricing
- MAPAI (meal plan) explanation
- Pricing transparency section
- Availability form

### 3. Group Trips (`group-booking.html`)

- ₹60,000/night full property offer
- Inclusions (bonfire, BBQ, music)
- Use cases (friends, family, corporate)
- Step-by-step booking process
- FAQ section

### 4. Contact (`contact.html`)

- Phone, WhatsApp, Email
- Inquiry form
- Google Maps embed
- Directions from major cities

---

## Room Categories

| Type           | Capacity | Weekday | Weekend |
| -------------- | -------- | ------- | ------- |
| Deluxe Garden  | 2 guests | ₹1,700  | ₹2,200  |
| Family / Group | 4 guests | ₹2,700  | ₹3,500  |
| Premium Valley | 2 guests | ₹2,000  | ₹2,600  |

_MAPAI (Breakfast + Dinner) available at additional cost_

---

## Design Principles

- **Earthy & Warm:** Forest greens, terracotta accents, cream backgrounds
- **Boutique-Indie Feel:** Not a template, feels human and authentic
- **Mobile-First:** Responsive across all devices
- **Conversion-Focused:** Clear CTAs, trust signals, minimal friction
- **SEO-Ready:** Semantic HTML, proper meta tags, clean URLs

---

## Color Palette

| Color         | Hex       | Usage                      |
| ------------- | --------- | -------------------------- |
| Forest Green  | `#2D5A3D` | Primary, headings, buttons |
| Terracotta    | `#C4785A` | Accents, highlights        |
| Muted Gold    | `#B8956B` | Stars, subtle accents      |
| Soft Cream    | `#FAF6F1` | Backgrounds                |
| Warm Charcoal | `#3D3D3D` | Body text                  |

---

## Roadmap

### Phase 1: Static Website ✅

- [x] Homepage
- [x] Rooms page
- [x] Group booking page
- [x] Contact page
- [x] Responsive design
- [x] CSS styling complete

### Phase 2: JavaScript Functionality ✅

- [x] Date picker validation
- [x] Booking type toggle
- [x] Form validation
- [x] Mobile menu hamburger
- [x] Dynamic Pricing Calculator
- [x] WhatsApp Integration

### Phase 3: Backend Integration

- [ ] Node.js + Express server
- [ ] MongoDB database
- [ ] Booking API endpoints
- [ ] Availability checking logic
- [ ] Admin dashboard

### Phase 4: Production

- [ ] Payment integration (advance booking)
- [ ] WhatsApp notifications
- [ ] Google Analytics
- [ ] Domain + hosting setup

---

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/naqsh-resort.git
```

2. Open in VS Code:

```bash
cd naqsh-resort
code .
```

3. Run with Live Server or open `index.html` directly in browser.

---

## Images Required

Add these images to the `/images` folder:

- `hero-bg.jpg` - Homepage hero background
- `deluxe-garden.jpg` - Deluxe Garden room photo
- `family-group.jpg` - Family/Group room photo
- `premium-valley.jpg` - Premium Valley View room photo

---

## Contributing

This is a personal project for Naqsh Resort. Not open for external contributions at this time.

---

## Contact

**Naqsh Resort**

- 📍 Mohanchatti, Rishikesh, Uttarakhand
- 📞 +91 90454 67967
- 📧 stay@naqshresort.com

---

## License

This project is proprietary. All rights reserved.

---

_Built with focus on learning web development while creating a real, revenue-generating product._
