# Indian Airport Lounge Finder (Frontend)

This repository contains the mobile-first web front-end for the Indian Airport **Lounge Finder**.

## Tech Stack

* React 18 + TypeScript
* Vite for blazing-fast dev server & build
* Material-UI (MUI v5) for UI component library
* Framer-Motion & Lottie for delightful motion
* TanStack React-Query for data fetching & caching
* Mock Service Worker (MSW) for local API mocks
* ESLint + Prettier + Husky for code quality

## Brand Basics

| Purpose | Value |
|---------|-------|
| Primary Color | `#2A9D8F` |
| Secondary Color | `#E9C46A` |
| Accent Color | `#F4A261` |
| Background | `#F0F3F4` |
| Text Primary | `#264653` |
| Font | Roboto (Google Fonts) |

## Getting Started

```bash
# 1. Install dependencies
pnpm install   # or yarn / npm install

# 2. Start dev server with mock APIs
pnpm dev       # http://localhost:5173

# 3. Build for production
pnpm build
```

MSW runs automatically in development (`import.meta.env.DEV`).

## Folder Structure

```
|-- public/
|-- src/
|   |-- components/    # reusable UI pieces
|   |-- pages/         # routed pages (coming soon)
|   |-- mock/          # MSW handlers & fixtures
|   |-- theme.ts       # MUI theme with brand colors
|   |-- main.tsx       # React entry
|   `-- App.tsx        # root component
|-- index.html         # document skeleton
|-- vite.config.ts     # build configuration
```

## Roadmap

* Results page with conditional flows
* Lounge details page
* API integration with Supabase REST
* Analytics (Plausible/PostHog)
* CI/CD pipeline to Vercel/Netlify

---

📐 **Target Lighthouse score**: 90+ across Performance, Accessibility, Best Practices, SEO. 