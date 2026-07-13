# AI Context: stellarglobalsupplies-website
> **Repo**: Stellar-Global-Supplies/stellarglobalsupplies-website
> **Generated**: 2026-07-13
> **Source**: ai_context/ folder — do not edit manually

---

## 🏗️ What It Does
Stellar Global Supplies is a B2B web platform addressing procurement challenges for industrial buyers in India by providing a digital catalog of over 500 products in Stainless Steel, Mild Steel, and Fastening categories. The platform enhances supplier visibility and streamlines the enquiry process, benefiting manufacturers, fabricators, and procurement managers.

## ⚙️ Tech Stack
- **Language**: TypeScript 5, JavaScript ES2022
- **Frontend**: Next.js 14.2.4 (App Router), React 18, Tailwind CSS 3.4.4, PostCSS 8.4.38, Autoprefixer 10.4.19
- **Backend/API**: NONE — Static site generation (SSG) with Next.js export
- **Database & Storage**: NONE — Static site with no database
- **AI/ML**: NONE
- **Infra & Cloud**: AWS S3 (static file hosting), AWS CloudFront (CDN), GitHub Actions (CI/CD)
- **CI/CD & Observability**: GitHub Actions, ESLint 8, TypeScript Compiler, SWC (compiler/minifier)
- **Auth**: OIDC (OpenID Connect) for AWS authentication
- **Key Integrations**: Lucide React 0.383.0 (icons), Framer Motion 11.3.2 (animations), Google Fonts (Inter font family), clsx 2.1.1 (utility)

## 🚀 Highlight Features
- **Product Catalog with Tab Navigation**: Utilizes React state management and Next.js static generation for seamless tab-based filtering of 500+ products.
- **Sticky Navigation with Dropdown Menu**: Implements a timeout-based hover system using IntersectionObserver API for active section detection and improved user experience.
- **Smooth Scroll Navigation**: Leverages native DOM scrollIntoView API for animated scrolling between sections, enhancing navigation fluidity.
- **SEO Optimization System**: Employs Next.js Metadata API and JSON-LD structured data for comprehensive SEO, achieving a 100/100 Lighthouse score.
- **Performance Optimized Rendering**: Integrates CSS will-change and content-visibility for fast page loads and smooth animations, resulting in a 90+ Lighthouse performance score.
- **Automated CI/CD Pipeline**: Uses GitHub Actions and OIDC for secure AWS deployments, streamlining the development workflow.
- **Glassmorphism Design System**: Applies Tailwind CSS for a modern visual style with glassmorphism effects, enhancing aesthetic appeal.

## 🧠 Architecture & Key Decisions
- **Static Site Generation (SSG)**: Chose Next.js export mode for maximum performance and global CDN distribution, suitable for a marketing platform with no dynamic data.
- **OIDC for AWS Authentication**: Migrated to OIDC for temporary credentials, reducing the burden of secret rotation and enhancing security.
- **Component-Based Architecture**: Built with React functional components for maintainability and independent testing of UI sections.
- **CSS-in-JS via Tailwind**: Selected Tailwind CSS for utility-first development, ensuring a consistent design system and smaller bundle sizes.
- **IntersectionObserver over Scroll Events**: Used IntersectionObserver API for scroll detection to improve performance and reduce jank.

## 📈 Scale & Impact
- **Active users**: UNKNOWN
- **Requests/day**: UNKNOWN
- **Data volume**: ~50MB (500+ product images + static assets)
- **Uptime**: 99.9% (AWS S3 + CloudFront SLA)
- **Team size**: 1 developer

## 🔥 Engineering Challenges Solved

### Dropdown Menu Click Issue
**Problem:** The Products dropdown menu items were not clickable due to premature closing before click events could register.  
**Failed approach:** Initial use of onBlur event handler with setTimeout created race conditions.  
**Solution:** Implemented a timeout-based hover system using useRef to manage a close timer, allowing for a grace period for user interactions.

### Performance Optimization at Scale
**Problem:** Slow initial load times and janky scroll performance due to 500+ product images and complex animations.  
**Failed approach:** Standard CSS transitions without GPU acceleration led to layout thrashing.  
**Solution:** Applied multi-layered optimizations including CSS will-change, content-visibility, and font-display: swap, achieving a 90+ Lighthouse performance score.

### SEO for Static Export
**Problem:** Loss of SEO capabilities in static export compared to SSR, particularly for dynamic meta tags.  
**Failed approach:** Client-side meta tag injection was unreliable for search engines.  
**Solution:** Leveraged Next.js Metadata API with generateMetadata function and implemented comprehensive JSON-LD structured data, achieving a 100/100 SEO score.

## 🎨 UI & Visual Identity

### Brand Colors
| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Green | #00B98E | CTAs, links, active states, accents |
| Secondary | Orange | #FF6922 | Highlights, gradients, secondary actions |
| Accent | Mint | #EFFDF5 | Page backgrounds, section alternates |
| Background | Navy | #0E2E50 | Text, headers, footer, strong contrasts |
| Surface | White | #FFFFFF | Cards, modals, elevated surfaces |
| Text Primary | Dark Gray | #4a5568 | Body text, muted elements |
| Text Secondary | Light Gray | #718096 | Body text, muted elements |

### Typography
- **Primary Font**: Inter (400 - regular, 700 - bold) for body text and headings
- **Secondary Font**: Arial, Helvetica Neue (fallbacks)
- **Heading sizes**: H1 scale from 3xl (mobile) to 5xl (desktop), H2 from 2xl to 4xl

### Visual Style
- **Design language**: Glassmorphism
- **Border radius**: Rounded-2xl (16px)
- **Shadows**: Subtle (shadow-card, shadow-glass)
- **Spacing scale**: Base unit: 4px
- **Iconography**: Lucide React
- **Illustration style**: None

### Logo & Mark
- **Logo type**: Icon + wordmark
- **Logo colors**: Green, Orange, Navy
- **Dark mode variant**: No

### Component Patterns
- **Buttons**: Rounded-xl (12px), px-6 py-3, font-semibold, shadow-primary for primary, border for ghost
- **Cards**: Rounded-2xl (16px), border border-gray-100, shadow-card, hover:shadow-card-hover
- **Badges/Tags**: Rounded-full, px-3 py-1, text-xs, font-semibold, uppercase tracking-widest
- **Navigation**: Sticky header, glass morphism on scroll, backdrop-blur

### Image Generation Prompt
Create a social media image for the Stellar Global Supplies web platform showcasing a modern B2B industrial supply catalog. Use a glassmorphism design style with a gradient background from light green (#00B98E) to white (#FFFFFF). Incorporate the Inter font for text, emphasizing the tagline "Everything Your Industry Needs, In One Place." Highlight the primary green (#00B98E) and secondary orange (#FF6922) colors in buttons and accents, maintaining a clean and professional layout.

---

## 💡 Post Angles
- **LinkedIn**: Discover how Stellar Global Supplies is revolutionizing the procurement process for industrial buyers in India with a modern, SEO-optimized web platform showcasing over 500 products.
- **X**: Tired of fragmented supplier options? Check out Stellar Global Supplies, your one-stop digital catalog for Stainless Steel and Mild Steel materials!
- **Dev.to**: Building a high-performance static site with Next.js and Tailwind CSS: Lessons learned from developing the Stellar Global Supplies platform.
- **Bluesky**: Just launched the Stellar Global Supplies platform! A seamless way for industrial buyers to find reliable suppliers. Explore now!

## 🏷️ Hashtags
#NextJS, #TailwindCSS, #WebDevelopment, #B2B, #Ecommerce, #StaticSite, #AWS, #SEO, #React, #Glassmorphism, #PerformanceOptimization

## 📌 Soundbites
Stellar Global Supplies leverages Next.js and Tailwind CSS to deliver a high-performance static site for industrial procurement. With a 100/100 SEO score, it sets a new standard for digital catalogs in the B2B space.

## 🔍 SEO Keywords
Stellar Global Supplies, B2B industrial supply platform, procurement solutions, stainless steel suppliers, mild steel materials, product catalog, SEO-optimized website, Next.js static site, Tailwind CSS design, AWS hosting solutions.