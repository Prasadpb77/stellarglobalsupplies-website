# UI

## Pages

### Homepage (Hero Section)
**Route:** /
**Purpose:** Above-the-fold hero section that immediately communicates the company's value proposition and drives users to explore products or make contact.
**Layout:** Full-width hero with gradient mesh background (light green to white), centered content layout. Large bold headline "Everything Your Industry Needs, In One Place" with gradient text effect. Subheadline describing the value proposition. Two prominent CTA buttons side-by-side: "Explore Products" (primary green) and "Get a Quote" (secondary orange). Trust indicators below showing product count and delivery promise.
**Key Components:** Hero headline with gradient text, dual CTA buttons with hover animations, trust badge showing "500+ Products" and "Pan-India Delivery", subtle background pattern with radial gradients.
**Colors:** Primary green (#00B98E) for main CTA, secondary orange (#FF6922) for accent, light mint background (#EFFDF5), dark navy text (#0E2E50), white cards with glassmorphism effects.
**Mobile Behavior:** Stacked layout with full-width buttons, reduced font sizes, simplified background pattern, touch-friendly button sizes (min 44px height).

### Products Catalog Section
**Route:** /#products
**Purpose:** Showcase the complete product catalog with category filtering and detailed product information.
**Layout:** Section header with "Our Products" badge and headline. Three tab buttons horizontally centered (Mild Steel, Stainless Steel, Locking & Fastening). Category tagline showing product count. Responsive grid layout: 1 column mobile, 2 columns tablet, 3-4 columns desktop. Each product card contains image, category badge, product name, description, and "Enquire Now" button.
**Key Components:** Tab navigation with active state (green background, white text, shadow), product cards with hover lift effect and image zoom, category badges, enquiry buttons with arrow icons, loading skeleton states.
**Colors:** White card backgrounds with subtle borders, green active tab state, gray text for descriptions, hover effects with green accents, category badges in primary green.
**Mobile Behavior:** Tabs show short labels (MS, SS, L&F), single column grid, full-width cards, touch-friendly tap targets, horizontal scroll for tabs if needed.

### About Section
**Route:** /#about
**Purpose:** Build trust and credibility by telling the company's story and showcasing core values.
**Layout:** Two-column layout on desktop (text left, image/visual right), single column on mobile. Section badge "About Us", headline, descriptive paragraphs. Bento grid layout for core values with icon cards.
**Key Components:** Section heading with gradient accent, text content blocks, bento grid cards with icons, hover effects on value cards, glassmorphism card backgrounds.
**Colors:** Dark navy headings, gray body text, green accent elements, white/glass cards with subtle shadows, light background.
**Mobile Behavior:** Stacked single column, larger text for readability, full-width cards, simplified bento grid (2x2 instead of 3x3).

### Why Choose Us (Bento Grid)
**Route:** /#why-us (or integrated into About)
**Purpose:** Highlight key differentiators and value propositions in a visually engaging format.
**Layout:** 5-card bento grid with varying sizes (some cards span 2 columns). Each card has icon, title, and description. Hover effects with lift and shadow.
**Key Components:** Bento cards with rounded corners (2xl), icon containers with gradient backgrounds, hover lift animation (-translate-y-2), shadow effects, glass morphism styling.
**Colors:** White card backgrounds, green icon accents, dark text, subtle borders, hover states with green highlights.
**Mobile Behavior:** Single column stack, reduced padding, smaller icons, simplified hover effects (no lift on touch devices).

### Contact Section
**Route:** /#contact
**Purpose:** Provide multiple contact methods and encourage enquiries.
**Layout:** Section with contact cards (phone, email, address) and enquiry form or CTA buttons. Grid layout on desktop, stacked on mobile.
**Key Components:** Contact cards with icons (Phone, Mail, MapPin), click-to-call buttons, email links, address display, "Discuss Your Requirements" CTA button.
**Colors:** White cards with green accents, dark text, primary green buttons, hover effects.
**Mobile Behavior:** Full-width cards, larger touch targets, sticky CTA button at bottom.

### Footer
**Route:** Site-wide footer
**Purpose:** Provide site map, contact info, and quick links.
**Layout:** Multi-column footer with company info, quick links, contact details, and copyright. Dark background (#0E2E50) with white/light text.
**Key Components:** Logo, company description, navigation links, contact information, social media placeholders, copyright notice, back-to-top button.
**Colors:** Dark navy background, white text, green accent links, subtle hover effects.
**Mobile Behavior:** Single column, stacked layout, collapsible sections, full-width links.

### Blog Listing Page
**Route:** /blog
**Purpose:** Display all blog posts in a grid layout with filtering by tags and search functionality.
**Layout:** Hero section with gradient background and title "Industrial Supplies Insights". Grid layout showing blog post cards (3 columns desktop, 2 tablet, 1 mobile). Each card features featured image, tags, title, excerpt, date, and author. CTA section at bottom encouraging contact.
**Key Components:** Blog card grid, tag badges, hero section with gradient, CTA section with contact buttons, structured data for SEO.
**Colors:** White cards with subtle borders, green primary accents, dark text, gradient hero (primary-600 to primary-800), hover effects with shadow and border color changes.
**Mobile Behavior:** Single column grid, stacked cards, full-width CTAs, reduced padding, touch-friendly card interactions.

### Individual Blog Post Page
**Route:** /blog/[slug]
**Purpose:** Display full blog post content with optimized reading experience and strong CTAs.
**Layout:** Full-width hero image with gradient overlay, blog title and meta info overlaid at bottom. Content area with max-width constraint for readability. Excerpt highlighted in styled box. Article content with proper heading hierarchy. Author info section. Back to blog link. Bottom CTA section with contact options.
**Key Components:** Featured image hero with gradient overlay, tag badges, title overlay, date/author metadata, excerpt highlight box, article content with markdown rendering, author avatar and bio, navigation back to blog, contact CTAs with phone/email.
**Colors:** White background, dark text for readability, green accents for CTAs and tags, hero gradient (black/80 to transparent), primary-50 for excerpt background, green left border for excerpt.
**Mobile Behavior:** Reduced hero height, stacked layout, full-width content, larger touch targets for CTAs, simplified author section.

---

## Design System

**Color Palette:**
- Primary: #00B98E (green) - CTAs, links, active states, accents
- Secondary: #FF6922 (orange) - Highlights, gradients, secondary actions
- Light: #EFFDF5 (mint) - Page backgrounds, section alternates
- Dark: #0E2E50 (navy) - Text, headers, footer, strong contrasts
- White: #FFFFFF - Cards, modals, elevated surfaces
- Gray: #4a5568, #718096 - Body text, muted elements

**Typography:**
- Font family: Inter (Google Fonts) with system fallbacks (Arial, Helvetica Neue)
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)
- Heading scale: 3xl (mobile) → 5xl (desktop) for H1, 2xl → 4xl for H2
- Body text: base (16px) with leading-relaxed (1.625)
- Small text: sm (14px) for captions and labels

**Components:**
- Buttons: Rounded-xl (12px), px-6 py-3, font-semibold, shadow-primary for primary, border for ghost, hover:-translate-y-0.5 for lift effect
- Cards: Rounded-2xl (16px), border border-gray-100, shadow-card, hover:shadow-card-hover, hover:-translate-y-2
- Forms: Rounded-lg inputs, focus:ring-2 focus:ring-primary-500, border border-gray-200
- Navigation: Sticky header, glass morphism on scroll, backdrop-blur, z-50
- Badges: Rounded-full, px-3 py-1, text-xs, font-semibold, uppercase tracking-widest

**Spacing:**
- Base unit: 4px (Tailwind default)
- Section padding: py-20 (mobile) → py-28 (desktop)
- Card padding: p-4 to p-6
- Grid gaps: gap-5 for product grid, gap-8 for sections

**Breakpoints:**
- sm: 640px (tablets, large phones)
- md: 768px (tablets)
- lg: 1024px (laptops)
- xl: 1280px (desktops)
- 2xl: 1536px (large desktops)

**Visual Effects:**
- Glassmorphism: backdrop-blur(16px) saturate(180%), rgba(255,255,255,0.72) background
- Gradients: Linear gradients for text (primary → secondary), radial gradients for backgrounds
- Shadows: shadow-card (subtle), shadow-glass (glass effect), shadow-primary (green tint)
- Animations: transition-all duration-300, hover:translate-y-2, fade-in on scroll
- Image zoom: scale(1.06) on hover with 500ms transition