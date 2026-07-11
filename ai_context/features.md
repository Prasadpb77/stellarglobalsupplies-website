# Features

## Core Features

### Product Catalog with Tab Navigation
**What it does:** Displays 500+ industrial products across 3 categories (Mild Steel, Stainless Steel, Locking & Fastening) with tab-based filtering and detailed product cards.
**Powered by:** React state management with useState hooks, Next.js static generation, Tailwind CSS grid system.
**Why it's notable:** Implements client-side tab switching without page reloads, lazy loading images for performance, and maintains SEO through static generation. The tab system uses ARIA roles for accessibility.

### Sticky Navigation with Dropdown Menu
**What it does:** Provides persistent navigation with a Products dropdown that supports both hover and click interactions, mobile hamburger menu, and active section detection.
**Powered by:** React hooks (useState, useEffect, useCallback, useRef), IntersectionObserver API, Lucide React icons.
**Why it's notable:** Implements a timeout-based hover system to solve the gap problem between button and dropdown. Uses IntersectionObserver for performant scroll-based active section detection without scroll event listeners.

### Smooth Scroll Navigation
**What it does:** Enables animated scrolling between sections when clicking navigation links, with proper URL hash management.
**Powered by:** Native DOM scrollIntoView API with behavior: 'smooth', React event handlers.
**Why it's notable:** Prevents default anchor behavior and implements custom smooth scrolling that works across browsers. Includes mobile menu auto-close on navigation.

### SEO Optimization System
**What it does:** Comprehensive search engine optimization with 20+ keywords, geographic targeting, structured data, and social media meta tags.
**Powered by:** Next.js Metadata API, JSON-LD structured data (Schema.org), Open Graph protocol, Twitter Cards.
**Why it's notable:** Implements Organization, LocalBusiness, and WebSite schemas for rich search results. Includes geo-coordinates (18.6727, 73.8196) for local SEO in Pune, Maharashtra.

### Performance Optimized Rendering
**What it does:** Ensures fast page loads and smooth animations through GPU acceleration, optimized font loading, and intelligent caching.
**Powered by:** CSS will-change and transform: translateZ(0) for GPU acceleration, content-visibility for rendering optimization, font-display: swap, Next.js SWC minification.
**Why it's notable:** Implements content-visibility: auto for off-screen images, reducing initial render time. Uses contain: layout style paint to minimize layout recalculations.

### Automated CI/CD Pipeline
**What it does:** Automatically builds and deploys the site to AWS S3 + CloudFront when code is pushed to main branch.
**Powered by:** GitHub Actions, OIDC (OpenID Connect) for secure AWS authentication, AWS CLI.
**Why it's notable:** Uses OIDC instead of long-lived AWS credentials, providing temporary 15-minute tokens. Implements sophisticated cache strategies (1 year for static assets, no-cache for HTML).

### Glassmorphism Design System
**What it does:** Provides a modern, premium visual design with glass-morphism effects, custom shadows, and smooth animations.
**Powered by:** Tailwind CSS custom utilities, CSS backdrop-filter, CSS custom properties (variables), Framer Motion.
**Why it's notable:** Implements performant glassmorphism with backdrop-filter and saturate, custom shadow system (shadow-glass, shadow-card, shadow-primary), and GPU-accelerated transitions.

### Contact Integration
**What it does:** Multiple touchpoints for customer contact including click-to-call, email links, enquiry buttons, and floating chat widget.
**Powered by:** Tel: and mailto: protocols, React component composition, Lucide React icons.
**Why it's notable:** Each product has a contextual "Enquire Now" button that scrolls to contact section. Multiple CTAs strategically placed throughout the page.

---

## Recently Shipped
- **[June 2025]:** Fixed Products dropdown click issue with timeout-based hover logic
- **[June 2025]:** Enhanced SEO with 20+ keywords and geographic targeting
- **[June 2025]:** Migrated CI/CD to OIDC authentication for enhanced security
- **[June 2025]:** Implemented comprehensive performance optimizations (SWC, GPU acceleration, caching)
- **[June 2025]:** Added security headers (X-Frame-Options, X-XSS-Protection)

## In Progress / Coming Soon
NONE

## Developer Experience Features
- Hot module replacement with npm run dev
- TypeScript strict mode for type safety
- ESLint for code quality
- Static export for simple deployment (npm run export)
- Component-based architecture for maintainability
- Comprehensive README with deployment guide
- Detailed optimization logs and documentation

## Notable Performance Numbers
- **Page Load Time:** < 2 seconds (target)
- **Performance Score:** 90+ (Lighthouse target)
- **SEO Score:** 100/100 (target)
- **Accessibility Score:** 95+ (WCAG 2.1 AA target)
- **Uptime:** 99.9% (AWS infrastructure)
- **Bundle Size:** Optimized with tree-shaking and SWC minification
- **Cache Duration:** 1 year for static assets, 7 days for images
- **Build Time:** ~30-60 seconds (GitHub Actions)