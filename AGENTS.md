# AI Agents Context — Tea4Life Frontend

This document provides context for AI agents working on the Tea4Life codebase. It describes the project architecture, design system, conventions, and current state so that agents can make consistent, informed changes.

---

## Project Overview

**Tea4Life** is a Bubble Tea F&B ordering website. Customers browse a menu of tea drinks, customize their order (size, sugar, ice, toppings), and place orders online. It is NOT a traditional e-commerce shop — it follows an F&B ordering flow similar to GrabFood or ShopeeFood.

### Business Model

- **Type**: F&B Tea ordering platform
- **Menu categories**: Trà sữa, Trà trái cây, Macchiato, Sữa tươi, Cà phê
- **Brands**: Tea4Life (own brand), Gong Cha, Phúc Long, TocoToco
- **Ordering flow**: Browse menu → Select drink → Customize (size/sugar/ice/toppings) → Add to cart → Checkout

---

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | React 18+ with TypeScript                                 |
| Build Tool | Vite                                                      |
| Routing    | React Router v6 (`createBrowserRouter`)                   |
| Styling    | Tailwind CSS v4 + custom CSS classes in `index.css`       |
| UI Library | shadcn/ui components (`@/components/ui/*`)                |
| Icons      | lucide-react                                              |
| State      | URL search params for filters, React `useState` for local |
| Auth       | Keycloak integration via `@/lib/keycloak`                 |

---

## Design System

### Visual Style

A blend of **modern minimalism** and **subtle retro/pixel aesthetics** — clean, light, and not heavy.

### Color Palette: "Nature's Breath"

| Token        | Hex       | Usage                               |
| ------------ | --------- | ----------------------------------- |
| Forest Green | `#1A4331` | Primary text, borders, buttons      |
| Sage Green   | `#8A9A7A` | Secondary text, icons, hover states |
| Caramel      | `#D2A676` | Accents, badges, star ratings       |
| Cream        | `#F8F5F0` | Page backgrounds                    |
| White        | `#FFFFFF` | Card backgrounds, inputs            |

### CSS Classes (defined in `src/index.css`)

- `.pixel-text` — clean sans-serif font ("Inter", "Segoe UI", system-ui) with tight letter-spacing
- `.pixel-button` — square button with 4px shadow (use sparingly, prefer `rounded-none` for lighter feel)
- `.pixel-border` — 4px solid border with offset shadow (use sparingly)

### Design Rules

1. **Keep it light** — Use `border-2 border-[#1A4331]/20` instead of heavy pixel-border for cards
2. **Subtle shadows** — Max `shadow-[4px_4px_0px_...]` on hover, no static shadows on cards
3. **Square corners** — Always `rounded-none` for buttons, inputs, cards
4. **Small text** — Prefer `text-xs` and `text-sm` for labels, `text-base` for body
5. **Background grid** — Subtle grid pattern at `opacity-[0.03]` on all pages
6. **No game styling** — No underscores in text, no bracket notation `[ ]` except in header nav

---

## Project Structure

```
src/
├── components/
│   ├── custom/          # App-specific components (Header, UserMenu, Footer)
│   └── ui/              # shadcn/ui base components
├── features/
│   └── auth/            # Auth hooks and utilities
├── layouts/
│   ├── RootLayout.tsx   # Public + Customer layout (Header + Footer)
│   ├── AdminLayout.tsx  # Admin dashboard layout
│   └── DriverLayout.tsx # Driver panel layout
├── lib/                 # Utilities (keycloak, utils)
├── pages/
│   ├── public-route-pages/
│   │   ├── landing/     # Homepage with carousel, categories, deals, story
│   │   │   └── components/  # HeroCarousel, CategoriesSection, etc.
│   │   ├── shop/        # Menu page (grouped by category, sticky filter)
│   │   │   ├── components/FilterSidebar.tsx
│   │   │   └── constants.ts  # Mock product data, brands, regions, categories
│   │   ├── product-details/  # Drink customization (size, sugar, ice, toppings)
│   │   ├── about/       # About Us page
│   │   ├── cart/        # Shopping cart
│   │   ├── brands/      # Brands listing
│   │   └── categories/  # Categories listing
│   ├── customer-route-pages/
│   │   ├── orders/      # Order history
│   │   ├── order-details/ # Single order detail
│   │   ├── checkout/    # Checkout flow
│   │   └── profile/     # User profile (general, address, security)
│   ├── admin-route-pages/   # Admin CRUD pages
│   └── driver-route-pages/  # Driver delivery pages
└── router/
    └── index.tsx        # All routes defined here
```

---

## Key Pages & Their Behavior

### Header (`src/components/custom/Header.tsx`)

- Nav: `[ TRANG CHỦ ]` → `/`, `THỰC ĐƠN` button → `/shop`, `[ VỀ CHÚNG TÔI ]` → `/about`
- Sticky, `font-mono`, border-bottom 4px
- Cart icon, Login/UserMenu based on auth state

### Menu / Shop Page (`/shop`)

- **No pagination** — shows ALL products
- Products **grouped by category** (region) with section headers
- Sticky filter sidebar: search by name, filter by brand/region/size
- Button text: "Đặt Ngay" (not "Thêm vào giỏ")

### Product Detail (`/shop/products/:id`)

- F&B ordering flow, NOT e-commerce detail
- Options: **Size** (S/M/L with price diff), **Mức đường** (0-100%), **Mức đá**, **Toppings** (with extra prices)
- Note field for special requests
- Dynamic total price calculation
- NO reviews tab, NO shipping tab, NO delivery/return benefits

### About Page (`/about`)

- Brand story, mission, stats, core values
- CTA to menu

---

## Conventions

### Vietnamese Language

- All UI text in Vietnamese
- Header nav uses bracket notation: `[ TRANG CHỦ ]`, `[ VỀ CHÚNG TÔI ]`
- Button labels: uppercase on header, normal case elsewhere
- No game-like formatting (underscores, pixel references)

### Code Style

- `"use client"` at top of page components
- Functional components with `export default`
- URL search params for filter state (shareable URLs)
- `formatPrice()` using `Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })`
- Mock data in `constants.ts`, will be replaced with API calls later

### Component Patterns

- Page components in `pages/{role}-route-pages/{feature}/index.tsx`
- Sub-components in `pages/{feature}/components/`
- Filter sidebar as separate component receiving props
- shadcn/ui components for base UI (Button, Select, Input, Card, Tabs)

---

## Data Model (Mock — `shop/constants.ts`)

### Product

```ts
{
  id: number;
  name: string; // Vietnamese drink name
  price: number; // Base price in VND (e.g., 45000)
  size: string; // Default size: "S" | "M" | "L"
  brand: string; // "tea4life" | "gong-cha" | "phuc-long" | "tocotoco"
  region: string; // Category: "tra-sua" | "tra-trai-cay" | "macchiato" | "sua-tuoi"
  rating: number; // 1-5
  image: string; // Unsplash URL
}
```

### Customization Options (in product-details)

- **Size**: S (-5,000đ), M (standard), L (+10,000đ)
- **Sugar**: 0%, 30%, 50%, 70%, 100%
- **Ice**: Không đá, Ít đá, Bình thường, Nhiều đá
- **Toppings**: Trân châu đen/trắng, Thạch dừa, Pudding, Kem cheese, Shot espresso (each with extra price)

---

## Important Notes for Agents

1. **This is F&B, not e-commerce** — No shipping, no delivery tracking on product pages. Ordering flow = customize drink → add to cart.
2. **Keep designs light** — Avoid heavy borders (4px), big shadows, overly bold text. Prefer thin borders with opacity.
3. **Pixel style = subtle** — Square corners and grid background are enough. Don't overdo with thick borders and big shadows everywhere.
4. **Vietnamese text** — All content in Vietnamese. Use proper diacritics. Don't use English except for brand names.
5. **Mock data** — Currently using hardcoded data in `constants.ts`. API integration pending.
6. **Lint warnings** — `@custom-variant`, `@theme`, `@apply` warnings in `index.css` are Tailwind v4 syntax — they are expected and NOT bugs.
