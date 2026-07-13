# AI Context: stellarglobalsupplies-website
> **Repo**: Stellar-Global-Supplies/stellarglobalsupplies-website
> **Generated**: 2026-07-13
> **Source**: ai_context/ folder — do not edit manually

---

## 🏗️ What It Does
The Stellar Global Supplies Web Platform addresses the challenges faced by industrial buyers in India who struggle to find reliable suppliers for Stainless Steel, Mild Steel, and Fastening products. It provides a modern, SEO-optimized digital catalog and enquiry portal showcasing over 500 products, enabling direct contact for quotes and enhancing online credibility through professional design and fast performance.

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
- **Product Catalog with Tab Navigation**: Built with React state management and Next.js static generation, allowing client-side tab switching without page reloads.
- **Sticky Navigation with Dropdown Menu**: Utilizes React hooks and IntersectionObserver API for performant scroll detection and a timeout-based hover system to resolve dropdown click issues.
- **SEO Optimization System**: Implements Next.js Metadata API and JSON-LD structured data for comprehensive search engine optimization.
- **Performance Optimized Rendering**: Leverages CSS will-change and transform for GPU acceleration, ensuring fast page loads and smooth animations.
- **Automated CI/CD Pipeline**: Uses GitHub Actions and OIDC for secure AWS authentication, automating builds and deployments.
- **Glassmorphism Design System**: Employs Tailwind CSS for modern design with glass-morphism effects and custom shadows.
- **Contact Integration**: Provides multiple contact methods with contextual enquiry buttons for user engagement.

## 🧠 Architecture & Key Decisions
- **Static Site Generation (SSG)**: Chose Next.js export mode for maximum performance and zero server costs, suitable for a marketing/catalog platform.
- **OIDC for AWS Authentication**: Migrated to OIDC for temporary credentials, reducing the burden of secret rotation and enhancing security.
- **Component-Based Architecture**: Built with React functional components for maintainability, enabling independent development and testing.
- **CSS-in-JS via Tailwind**: Selected Tailwind CSS for utility-first development, enforcing a consistent design system and smaller bundle sizes.
- **IntersectionObserver API**: Used for active section detection, improving performance by avoiding scroll event listeners.

## 📈 Scale & Impact
- **Active users**: UNKNOWN
- **Requests/day**: UNKNOWN
- **Data volume**: ~50MB (500+ product images + static assets)
- **Uptime**: 99.9% (AWS S3 + CloudFront SLA)
- **Team size**: 1 developer

## 🔥 Engineering Challenges Solved

### Dropdown Menu Click Issue
**Problem:** The Products dropdown menu items were not clickable due to the dropdown closing before click events could register.  
**Failed approach:** Initial attempts with onBlur event handler and setTimeout caused race conditions.  
**Solution:** Implemented a timeout-based hover system using useRef to manage a close timer, allowing a grace period for user interaction.

### Performance Optimization at Scale
**Problem:** Slow initial load times and janky scroll performance due to 500+ product images and complex animations.  
**Failed approach:** Standard CSS transitions without GPU acceleration led to layout thrashing.  
**Solution:** Multi-layered optimizations including CSS will-change, content-visibility, and SWC minification resulted in a 90+ Lighthouse performance score.

### SEO for Static Export
**Problem:** Loss of SEO capabilities in Next.js static export, particularly for dynamic meta tags.  
**Failed approach:** Client-side meta tag injection was unreliable for search engines.  
**Solution:** Leveraged Next.js Metadata API with generateMetadata for static generation and implemented comprehensive JSON-LD structured data.

## 🎨 UI & Visual Identity

### Brand Colors
| Role       | Name    | Hex      | Usage                           |
|------------|---------|----------|---------------------------------|
| Primary    | Green   | #00B98E  | CTAs, links, active states      |
| Secondary  | Orange  | #FF6922  | Highlights, gradients           |
| Background | Mint    | #EFFDF5  | Page backgrounds, section alternates |
| Text       | Navy    | #0E2E50  | Text, headers, footer           |
| Surface    | White   | #FFFFFF  | Cards, modals, elevated surfaces |
| Gray       | Gray    | #4a5568, #718096 | Body text, muted elements |

### Typography
- **Primary Font**: Inter (400, 500, 600, 700) - Body text and headings
- **Secondary Font**: Arial, Helvetica Neue (fallbacks) - Body text
- **Heading sizes**: H1 (3xl mobile → 5xl desktop), H2 (2xl → 4xl)

### Visual Style
- **Design language**: Glassmorphism
- **Border radius**: Rounded (12px for buttons, 16px for cards)
- **Shadows**: Subtle (shadow-card, shadow-glass)
- **Spacing scale**: Base unit 4px
- **Iconography**: Lucide React
- **Illustration style**: None

### Logo & Mark
- **Logo type**: Icon + wordmark
- **Logo colors**: Green, Orange, Navy
- **Dark mode variant**: No

### Component Patterns
- **Buttons**: Rounded-xl (12px), px-6 py-3, font-semibold, hover:-translate-y-0.5
- **Cards**: Rounded-2xl (16px), border border-gray-100, hover:shadow-card-hover
- **Badges/Tags**: Rounded-full, px-3 py-1, text-xs, font-semibold
- **Navigation**: Sticky header, glass morphism on scroll

### Image Generation Prompt
Create a social media image for the Stellar Global Supplies Web Platform featuring a modern glassmorphism design with a gradient mesh background from light green to white. Use the Inter font for text, with a large bold headline in primary green (#00B98E) and a secondary orange (#FF6922) for accents. Include product images and a professional layout that emphasizes speed and reliability.

---

## 💡 Post Angles
- **LinkedIn**: Discover how Stellar Global Supplies is revolutionizing the procurement process for industrial materials in India with a modern, SEO-optimized web platform.
- **X**: Just launched our new website! Explore 500+ industrial products with seamless navigation and fast performance. #NextJS #WebDevelopment
- **Dev.to**: Building a static site with Next.js and Tailwind CSS: Lessons learned from optimizing performance and SEO for a B2B platform.
- **Bluesky**: Excited to share our new platform for industrial supplies! Check out how we tackled performance and user experience challenges.

## 🏷️ Hashtags
#NextJS, #React, #TailwindCSS, #WebDevelopment, #SEO, #StaticSite, #AWS, #PerformanceOptimization, #B2B, #IndustrialSupplies, #Glassmorphism

## 📌 Soundbites
Our static site built with Next.js achieves a 90+ Lighthouse performance score while maintaining a 100/100 SEO score. The innovative use of OIDC for AWS authentication enhances security without compromising on performance.

## 🔍 SEO Keywords
Stellar Global Supplies, industrial supply platform, B2B procurement, stainless steel suppliers, mild steel suppliers, fasteners, SEO optimization, Next.js static site, AWS CloudFront, performance optimization, glassmorphism design.