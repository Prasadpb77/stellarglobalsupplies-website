import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ── SEO METADATA ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://stellarglobalsupplies.com"),
  title: {
    default: "Stellar Global Supplies | Premium SS & MS Industrial Materials – Pune",
    template: "%s | Stellar Global Supplies",
  },
  description:
    "India's trusted one-stop industrial supply partner. Premium Stainless Steel, Mild Steel & Fastening products — sourced right, delivered fast. Based in Pune, serving pan-India industries since 2025.",
  keywords: [
    "stainless steel supplier pune",
    "mild steel supplier india",
    "industrial fasteners pune",
    "SS channels pipes sheets",
    "MS angles flats pipes pune",
    "hex bolts allen bolts india",
    "industrial raw material supplier",
    "stellar global supplies pune",
    "industrial procurement india",
    "locking fastening products",
    "nylock nuts castle nuts india",
    "metal supplier talawade pune",
  ],
  authors: [{ name: "Stellar Global Supplies", url: "https://stellarglobalsupplies.com" }],
  creator: "Stellar Global Supplies",
  publisher: "Stellar Global Supplies",
  category: "Industrial Supplies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://stellarglobalsupplies.com",
    siteName: "Stellar Global Supplies",
    title: "Stellar Global Supplies | Premium SS & MS Industrial Materials",
    description:
      "One-stop industrial supply hub. 500+ products. On-time delivery. Trusted by manufacturers across India.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stellar Global Supplies – Industrial Materials Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellar Global Supplies | Premium Industrial Materials",
    description:
      "One-stop industrial supply hub. SS, MS & Fastening products. Sourced right, delivered fast.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "https://stellarglobalsupplies.com",
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#00B98E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── STRUCTURED DATA (JSON-LD) ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stellarglobalsupplies.com/#organization",
      name: "Stellar Global Supplies",
      url: "https://stellarglobalsupplies.com",
      logo: {
        "@type": "ImageObject",
        url: "https://stellarglobalsupplies.com/img/logo.jpg",
        width: 200,
        height: 200,
      },
      description:
        "One-stop industrial supply partner specialising in Stainless Steel, Mild Steel and Fastening products.",
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Survey No - 169, Gala No - 3, Pandurang Industrial Complex, Rupee Nagar, Talawade",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411062",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9637655556",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      email: "stellarglobalsupplies@gmail.com",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://stellarglobalsupplies.com/#website",
      url: "https://stellarglobalsupplies.com",
      name: "Stellar Global Supplies",
      publisher: { "@id": "https://stellarglobalsupplies.com/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://stellarglobalsupplies.com/#localbusiness",
      name: "Stellar Global Supplies",
      image: "https://stellarglobalsupplies.com/img/logo.jpg",
      priceRange: "₹₹",
      telephone: "+91-9637655556",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Survey No - 169, Gala No - 3, Pandurang Industrial Complex, Rupee Nagar, Talawade",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411062",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  ],
};

// ── LAYOUT ────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
