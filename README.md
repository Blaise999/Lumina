# Lumina — Beauty & Fashion

Premium e-commerce store built with **Next.js 14**, **GSAP ScrollTrigger**, **Lenis smooth scroll**, and **Tailwind CSS**. Powered by DummyJSON API with 1,000+ products.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** | React framework with App Router |
| **GSAP 3.12** | ScrollTrigger pinning, parallax, morphing hero, stagger reveals |
| **Lenis** | Butter-smooth scroll engine (replaces native scroll) |
| **Framer Motion** | Component-level animations |
| **Tailwind CSS** | Utility-first styling |
| **DummyJSON** | 194 real products cycled to 1,000+ |

---

## How GSAP + Lenis Work Together

### Lenis (Smooth Scroll)
Initialized in `components/SmoothScroll.jsx`. Wraps the entire app and provides a custom scroll engine with configurable easing, duration, and multipliers. Exposed on `window.__lenis` for GSAP integration.

```
duration: 1.2
easing: exponential decay
wheelMultiplier: 1
touchMultiplier: 2
```

### GSAP ScrollTrigger (Hero)
The hero section (`components/Hero.jsx`) uses a pinned ScrollTrigger timeline:

1. **Section is pinned** for 300% of viewport height
2. **3 image layers** morph in sequence — each scales, fades, and transitions
3. **Parallax decorative elements** move at different speeds (-0.2 to -0.6)
4. **Headline characters** animate in with 3D rotateX reveal
5. **Background shifts** hue via CSS custom properties synced to scroll

### GSAP in Sections
Every `FeaturedSection`, `Editorial`, `CategoryShowcase`, and `Testimonials` component uses ScrollTrigger for:
- Staggered card reveals on scroll
- Parallax image movement in editorial blocks
- Heading fade-up animations

---

## Architecture

```
lumina/
├── app/
│   ├── layout.js                 # Root layout + Lenis + CartProvider
│   ├── page.js                   # Home (Hero → Marquee → Sections)
│   ├── globals.css               # Design system + component styles
│   ├── shop/page.js              # All 1,000+ products with infinite scroll
│   ├── products/[id]/page.js     # Product detail with gallery + tabs
│   ├── category/[slug]/page.js   # Category with filters + pagination
│   ├── cart/page.js              # Shopping bag
│   └── checkout/page.js          # 2-step checkout with Stripe demo
├── components/
│   ├── SmoothScroll.jsx          # Lenis provider
│   ├── Header.jsx                # Nav + SVG logo + search overlay
│   ├── Hero.jsx                  # GSAP pinned hero with 3 image layers
│   ├── ProductCard.jsx           # Hover image swap + quick add
│   ├── FeaturedSection.jsx       # Scroll-triggered product grid
│   ├── Editorial.jsx             # Split image/text with parallax
│   ├── CategoryShowcase.jsx      # Category grid with hover zoom
│   ├── Marquee.jsx               # Infinite text marquee
│   ├── Testimonials.jsx          # Reviews + press logos
│   ├── CartDrawer.jsx            # Slide-out cart
│   ├── Footer.jsx                # Newsletter + links
│   └── Toast.jsx                 # Add-to-bag notification
├── context/
│   └── CartContext.js            # Cart state management
├── lib/
│   └── api.js                    # DummyJSON helpers + 1000+ product cycling
```

---

## Design System

### Typography
- **Display**: Cormorant Garamond — elegant serif for headings
- **Body**: Outfit — clean geometric sans-serif

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `lum-800` | `#1A1A1A` | Primary text, buttons |
| `lum-teal` | `#00BFA5` | Accent, CTAs |
| `lum-gold` | `#C49A3C` | Ratings, premium elements |
| `lum-50` | `#F8F6F3` | Background |
| `lum-400` | `#8B7E74` | Secondary text |

### Visual Language
- No border-radius (sharp edges for editorial feel)
- Minimal color — black/white/cream with teal accents
- Typography-forward hierarchy
- Generous whitespace
- Motion as storytelling, not decoration

---

## Features

### 1,000+ Products
DummyJSON provides 194 real products. The `fetchAllProducts()` function in `lib/api.js` cycles these to create 1,008 unique entries with proper pagination and infinite scroll.

### Demo Stripe Checkout
The checkout page replicates Stripe's card element UI with card number formatting, type detection (Visa/Mastercard/Amex), expiry formatting, and a simulated processing flow with order confirmation.

### Hero Scroll Experience
The pinned hero creates a 3-screen-tall scroll zone where:
- Image 1 zooms and fades out
- Image 2 scales in from 1.2x
- Image 3 resolves at natural scale
- Text parallaxes upward throughout
- Decorative elements float at varied speeds

---

## Integrating Real Stripe

Replace the demo card form with Stripe Elements:

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

1. Create `app/api/create-payment-intent/route.js`
2. Initialize Stripe with your publishable key
3. Replace the card input with `<CardElement />`
4. Confirm payment on the backend

---

## License

MIT — Built for portfolio demonstration.
