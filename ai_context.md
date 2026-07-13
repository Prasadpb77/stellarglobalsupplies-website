# AI Context: stellarglobalsupplies-website
> **Repo**: Stellar-Global-Supplies/stellarglobalsupplies-website
> **Generated**: 2026-07-13
> **Source**: ai_context/ folder — do not edit manually

---

## 🏗️ What It Does
Stellar Global Supplies Web Platform is a production-grade B2B industrial supply platform for Stainless Steel, Mild Steel, and Fastening products, solving the problem of unreliable suppliers and inconsistent quality in the Indian market. It benefits industrial buyers, manufacturers, and fabricators by providing a digital catalog and enquiry portal with 500+ products.

## ⚙️ Tech Stack
- **Language**: 
  - TypeScript 5, JavaScript ES2022
- **Frontend**: 
  - Next.js 14.2.4 (App Router) · React 18 · Tailwind CSS 3.4.4 · PostCSS 8.4.38 · Autoprefixer 10.4.19
- **Backend/API**: 
  - NONE — Static site generation (SSG) with Next.js export
- **Database & Storage**: 
  - NONE — Static site with no database
- **AI/ML**: 
  - NONE
- **Infra & Cloud**: 
  - AWS S3 (static file hosting) · AWS CloudFront (CDN) · GitHub Actions (CI/CD)
- **CI/CD & Observability**: 
  - GitHub Actions · ESLint 8 · TypeScript Compiler · SWC (compiler/minifier)
- **Auth**: 
  - OIDC (OpenID Connect) for AWS authentication · No user authentication in application
- **Key Integrations**: 
  - Lucide React 0.383.0 (icons) · Framer Motion 11.3.2 (animations) · Google Fonts (Inter font family) · clsx 2.1.1 (utility)

## 🚀 Highlight Features
- **Product Catalog with Tab Navigation**: Displays 500+ industrial products across 3 categories with tab-based filtering and detailed product cards. Powered by React state management with useState hooks, Next.js static generation, Tailwind CSS grid system.
- **Sticky Navigation with Dropdown Menu**: Provides persistent navigation with a Products dropdown that supports both hover and click interactions, mobile hamburger menu, and active section detection. Powered by React hooks (useState, useEffect, useCallback, useRef), IntersectionObserver API, Lucide React icons.
- **Smooth Scroll Navigation**: Enables animated scrolling between sections when clicking navigation links, with proper URL hash management. Powered by Native DOM scrollIntoView API with behavior: 'smooth', React event handlers.
- **SEO Optimization System**: Comprehensive search engine optimization with 20+ keywords, geographic targeting, structured data, and social media meta tags. Powered by Next.js Metadata API, JSON-LD structured data (Schema.org), Open Graph protocol, Twitter Cards.
- **Performance Optimized Rendering**: Ensures fast page loads and smooth animations through GPU acceleration, optimized font loading, and intelligent caching. Powered by CSS will-change and transform: translateZ(0) for GPU acceleration, content-visibility for rendering optimization, font-display: swap, Next.js SWC minification.

## 🧠 Architecture & Key Decisions
- **Static Site Generation over SSR**: Chose Next.js export mode because the site is primarily a marketing/catalog platform with no dynamic user data. This enables global CDN distribution, zero server costs, and maximum performance.
- **OIDC for AWS Authentication**: Migrated from long-lived AWS access keys to OIDC (OpenID Connect) role-based authentication. This provides temporary 15-minute credentials, eliminates secret rotation burden, and creates an audit trail via AWS CloudTrail.
- **Component-Based Architecture**: Built with React functional components and hooks for maintainability. Each section (Hero, Products, About) is a separate component, enabling independent development and testing.
- **CSS-in-JS via Tailwind**: Chose Tailwind CSS over CSS modules or styled-components for utility-first development, smaller bundle sizes through purging, and consistent design system enforcement.
- **IntersectionObserver over Scroll Events**: Used IntersectionObserver API for active section detection instead of scroll event listeners. This runs off the main thread, reducing jank and improving performance.

## 📈 Scale & Impact
- **Active users**: UNKNOWN (analytics not yet implemented)
- **Requests/day**: UNKNOWN (CloudFront metrics available but not tracked)
- **Data volume**: ~50MB (500+ product images + static assets)
- **API p99 latency**: N/A (no API, static site)
- **Uptime**: 99.9% (AWS S3 + CloudFront SLA)
- **GitHub stars**: N/A (private repository)
- **npm downloads**: N/A (no published package)
- **Team size**: 1 developer

## 🔥 Engineering Challenges Solved

### Dropdown Menu Click Issue
**Problem:** The Products dropdown menu items were not clickable. The dropdown would close before click events could register on child items due to the gap between the button and dropdown menu.
**Failed approach:** Initial attempt used onBlur event handler with setTimeout, but this interfered with click events and created race conditions.
**Solution:** Implemented a timeout-based hover system using useRef to manage a close timer. Added handleDropdownEnter() to cancel pending close operations and handleDropdownLeave() with a 100ms delay. This creates a grace period for users moving their mouse from button to dropdown, solving the gap problem elegantly.

### Performance Optimization at Scale
**Problem:** A static site with 500+ product images and complex animations was experiencing slow initial load times and janky scroll performance.
**Failed approach:** Initial implementation used standard CSS transitions without GPU acceleration, causing layout thrashing and poor frame rates during scroll animations.
**Solution:** Implemented multi-layered performance optimizations: (1) CSS will-change and transform: translateZ(0) for GPU compositing, (2) content-visibility: auto for off-screen images to skip rendering, (3) contain: layout style paint to isolate component repaints, (4) font-display: swap with local fallbacks to prevent FOIT, (5) SWC minification and tree-shaking for smaller bundles. Result: 90+ Lighthouse performance score.

### SEO for Static Export
**Problem:** Next.js static export loses some SEO capabilities compared to SSR, particularly for dynamic meta tags and structured data.
**Failed approach:** Attempted to use client-side meta tag injection, but search engines may not execute JavaScript reliably.
**Solution:** Leveraged Next.js Metadata API with generateMetadata function for static generation. Implemented comprehensive JSON-LD structured data (Organization, LocalBusiness, WebSite schemas) directly in layout.tsx. Added 20+ targeted keywords, geographic meta tags with coordinates, Open Graph and Twitter Cards. Result: 100/100 SEO score on Lighthouse.

## 🎨 UI & Visual Identity

### Brand Colors
| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Green | #00B98E | CTAs, links, active states, accents |
| Secondary | Orange | #FF6922 | Highlights, gradients, secondary actions |
| Accent | Mint | #EFFDF5 | Page backgrounds, section alternates |
| Background | Navy | #0E2E50 | Text, headers, footer, strong contrasts |
| Surface | White | #FFFFFF | Cards, modals, elevated surfaces |
| Text Primary | Dark | #0E2E50 | Body text, headers |
| Text Secondary | Gray | #4a5568 | Body text, muted elements |
| Success | Green | #00B98E | Success states |
| Error | Red | #FF0000 | Error states |
| Warning | Yellow | #FFC800 | Warning states |

### Typography
- **Primary Font**: Inter (Google Fonts) with system fallbacks (Arial, Helvetica Neue)
- **Secondary Font**: None specified
- **Monospace Font**: None specified
- **Heading sizes**: 3xl (mobile) → 5xl (desktop) for H1, 2xl → 4xl for H2

### Visual Style
- **Design language**: Glassmorphism
- **Border radius**: Rounded-xl (12px)
- **Shadows**: Subtle, elevated
- **Spacing scale**: Base unit: 4px (Tailwind default)
- **Iconography**: Lucide React
- **Illustration style**: None

### Logo & Mark
- **Logo type**: Icon + wordmark
- **Logo colors**: Primary green (#00B98E) and secondary orange (#FF6922)
- **Dark mode variant**: No

### Component Patterns
- **Buttons**: Rounded-xl (12px), px-6 py-3, font-semibold, shadow-primary for primary, border for ghost, hover:-translate-y-0.5 for lift effect
- **Cards**: Rounded-2xl (16px), border border-gray-100, shadow-card, hover:shadow-card-hover, hover:-translate-y-2
- **Badges/Tags**: Rounded-full, px-3 py-1, text-xs, font-semibold, uppercase tracking-widest
- **Navigation**: Sticky header, glass morphism on scroll, backdrop-blur, z-50

### Image Generation Prompt
Create a social media image for the Stellar Global Supplies Web Platform featuring a modern, premium visual design with glass-morphism effects, custom shadows, and smooth animations. Use the primary green (#00B98E) and secondary orange (#FF6922) colors, Inter font family, and rounded-xl border radius for buttons and cards. Incorporate the gradient mesh background (light green to white) and subtle background pattern with radial gradients.

> [Generated image prompt goes here]

---

## 💡 Post Angles
- **LinkedIn**: "Discover the future of industrial supply with Stellar Global Supplies Web Platform. Explore 500+ Stainless Steel, Mild Steel, and Fastening products with detailed specifications and direct contact options."
- **X**: "Stellar Global Supplies launches a new web platform for industrial buyers. Find reliable suppliers and quality products with ease. #IndustrialSupply #B2B"
- **Dev.to**: "Building a production-grade B2B industrial supply platform with Next.js and Tailwind CSS. Learn how we optimized performance and SEO for a static site."
- **Bluesky**: "Introducing Stellar Global Supplies Web Platform. A digital catalog and enquiry portal for 500+ industrial products. Built with Next.js and deployed on AWS."

## 🏷️ Hashtags
#OpenSource, #NextJS, #ReactJS, #TailwindCSS, #IndustrialSupply, #B2B, #WebDevelopment, #StaticSite, #AWS, #SEO, #PerformanceOptimization, #Glassmorphism

## 📌 Soundbites
- "Stellar Global Supplies Web Platform: Your one-stop solution for industrial supply needs in India."
- "Explore 500+ Stainless Steel, Mild Steel, and Fastening products with detailed specifications and direct contact options."

## 🔍 SEO Keywords
Industrial supply, Stainless Steel, Mild Steel, Fastening products, B2B platform, digital catalog, enquiry portal, Next.js, Tailwind CSS, AWS, SEO optimization, performance optimization, glassmorphism, industrial buyers, procurement, vendor verification.