# Engineering

## Architecture Pattern
Static Site Generation (SSG) with Edge CDN and AI-Powered Automation — JAMstack architecture with GitHub Actions

## System Overview
```
User Request
    ↓
CloudFront CDN (Edge Cache)
    ↓
S3 Origin (Static Files)
    ↓
[HTML/CSS/JS/Images]
    ↓
Browser Rendering

Blog Content Creation
    ↓
GitHub Actions (content/blog/**)
    ↓
AWS OIDC Authentication
    ↓
AWS Bedrock Nova Pro (AI Analysis)
    ↓
Code Generation & Implementation
    ↓
Auto-commit & Deploy
```

The application is built as a static site using Next.js export feature. All pages are pre-rendered at build time into static HTML/CSS/JS files. These files are deployed to AWS S3 and distributed globally via CloudFront CDN. No server-side rendering or database queries occur at runtime.

## Key Architectural Decisions

- **Static Site Generation over SSR:** Chose Next.js export mode because the site is primarily a marketing/catalog platform with no dynamic user data. This enables global CDN distribution, zero server costs, and maximum performance. Trade-off: no real-time data, but perfect for this use case.
- **AI-Powered Blog Automation:** Implemented AWS Bedrock Nova Pro integration to automatically generate blog implementation from markdown files. Eliminates manual coding, ensures SEO optimization, and maintains marketing focus. Uses OIDC for secure AWS authentication without storing credentials.

- **OIDC for AWS Authentication:** Migrated from long-lived AWS access keys to OIDC (OpenID Connect) role-based authentication. This provides temporary 15-minute credentials, eliminates secret rotation burden, and creates an audit trail via AWS CloudTrail.

- **Component-Based Architecture:** Built with React functional components and hooks for maintainability. Each section (Hero, Products, About) is a separate component, enabling independent development and testing.

- **CSS-in-JS via Tailwind:** Chose Tailwind CSS over CSS modules or styled-components for utility-first development, smaller bundle sizes through purging, and consistent design system enforcement.

- **IntersectionObserver over Scroll Events:** Used IntersectionObserver API for active section detection instead of scroll event listeners. This runs off the main thread, reducing jank and improving performance.

## Hard Problems Solved

### Dropdown Menu Click Issue
**The problem:** The Products dropdown menu items were not clickable. The dropdown would close before click events could register on child items due to the gap between the button and dropdown menu.

**What failed first:** Initial attempt used onBlur event handler with setTimeout, but this interfered with click events and created race conditions. The blur event fired before the click event could propagate.

**The solution:** Implemented a timeout-based hover system using useRef to manage a close timer. Added handleDropdownEnter() to cancel pending close operations and handleDropdownLeave() with a 100ms delay. This creates a grace period for users moving their mouse from button to dropdown, solving the gap problem elegantly.

### AI-Powered Blog Implementation
**The problem:** Manually creating blog pages for each new blog post is time-consuming and error-prone. Requires consistent SEO optimization, marketing integration, and code quality.

**What failed first:** Initial thought was to create a simple template system, but this lacked flexibility for different content types and required manual updates for each post.

**The solution:** Implemented AWS Bedrock Nova Pro AI integration that analyzes markdown content and generates complete Next.js implementation. Uses structured prompts to ensure SEO optimization, marketing CTAs, and consistent code style. Smart file checking prevents overwrites. No artifacts workflow keeps repository clean.

### Performance Optimization at Scale
**The problem:** A static site with 500+ product images and complex animations was experiencing slow initial load times and janky scroll performance.

**What failed first:** Initial implementation used standard CSS transitions without GPU acceleration, causing layout thrashing and poor frame rates during scroll animations.

**The solution:** Implemented multi-layered performance optimizations: (1) CSS will-change and transform: translateZ(0) for GPU compositing, (2) content-visibility: auto for off-screen images to skip rendering, (3) contain: layout style paint to isolate component repaints, (4) font-display: swap with local fallbacks to prevent FOIT, (5) SWC minification and tree-shaking for smaller bundles. Result: 90+ Lighthouse performance score.

### SEO for Static Export
**The problem:** Next.js static export loses some SEO capabilities compared to SSR, particularly for dynamic meta tags and structured data.

**What failed first:** Attempted to use client-side meta tag injection, but search engines may not execute JavaScript reliably.

**The solution:** Leveraged Next.js Metadata API with generateMetadata function for static generation. Implemented comprehensive JSON-LD structured data (Organization, LocalBusiness, WebSite schemas) directly in layout.tsx. Added 20+ targeted keywords, geographic meta tags with coordinates, Open Graph and Twitter Cards. Result: 100/100 SEO score on Lighthouse.

## Scale & Metrics
- **Active users:** UNKNOWN (analytics not yet implemented)
- **Requests/day:** UNKNOWN (CloudFront metrics available but not tracked)
- **Data volume:** ~50MB (500+ product images + static assets)
- **API p99 latency:** N/A (no API, static site)
- **Uptime:** 99.9% (AWS S3 + CloudFront SLA)
- **GitHub stars:** N/A (private repository)
- **npm downloads:** N/A (no published package)
- **Team size:** 1 developer
- **Blog Automation:** ~2-3 minutes per blog post (including Bedrock API call and code generation)

## Performance Wins
- **Build Time:** ~30-60 seconds with SWC minification (down from ~2 minutes with Terser)
- **Bundle Size:** Reduced by ~40% through tree-shaking and SWC optimization
- **Image Loading:** Lazy loading + content-visibility reduces initial render time by ~60%
- **Cache Strategy:** 1-year cache for static assets, 7-day cache for images reduces repeat load to <500ms
- **Lighthouse Performance:** 90+ score (from initial ~65)
- **Lighthouse SEO:** 100/100 (from initial ~85)
- **Lighthouse Accessibility:** 95+ (WCAG 2.1 AA compliant)
- **Blog Automation:** Zero manual development time per blog post (automated code generation)

## What We'd Do Differently
- **Image Optimization:** Should have used Next.js Image component with custom loader instead of unoptimized: true. Would enable automatic WebP conversion and responsive images.
- **Analytics:** Should have implemented privacy-first analytics (Plausible/Fathom) from day one to track user behavior and measure SEO impact.
- **Component Library:** Should have evaluated shadcn/ui or Radix UI earlier for accessible primitives instead of building custom dropdowns and menus.

## Related Engineering Posts / Talks
NONE