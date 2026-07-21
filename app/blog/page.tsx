import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getAllBlogPosts, getBlogPostsByTag } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Stellar Global Supplies - Industrial Supplies Insights",
  description:
    "Stay updated with the latest insights on industrial supplies, B2B procurement, supply chain management, and stainless steel & mild steel products from Pune's trusted supplier.",
  keywords: [
    "industrial supplies blog",
    "B2B procurement tips",
    "supply chain management",
    "stainless steel products",
    "mild steel suppliers",
    "Pune industrial supplies",
    "procurement guide",
    "Stellar Global Supplies blog",
  ],
  openGraph: {
    title: "Blog | Stellar Global Supplies - Industrial Supplies Insights",
    description:
      "Expert insights on industrial supplies, procurement strategies, and supply chain optimization from Pune's leading supplier.",
    type: "website",
    url: "https://www.stellarglobalsupplies.com/blog",
    siteName: "Stellar Global Supplies",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stellar Global Supplies Blog",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Stellar Global Supplies",
    description:
      "Expert insights on industrial supplies and B2B procurement from Pune's trusted supplier.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.stellarglobalsupplies.com/blog",
  },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Stellar Global Supplies Blog",
    description:
      "Expert insights on industrial supplies, procurement strategies, and supply chain optimization.",
    url: "https://www.stellarglobalsupplies.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Stellar Global Supplies",
      logo: {
        "@type": "ImageObject",
        url: "https://www.stellarglobalsupplies.com/img/logo.jpg",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      description: post.excerpt,
      image: post.image,
      url: `https://www.stellarglobalsupplies.com/blog/${post.slug}`,
    })),
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Industrial Supplies Insights
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                Expert guidance on B2B procurement, supply chain optimization, and
                industrial materials from Pune's trusted supplier
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed with our latest insights on industrial supplies,
                procurement strategies, and supply chain management
              </p>
            </div>

            {/* Blog Posts */}
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No blog posts available yet. Check back soon for the latest
                  insights!
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                Need Industrial Supplies?
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Partner with Stellar Global Supplies for premium stainless steel,
                mild steel, and industrial fastening products. Quality guaranteed,
                delivered fast from Pune.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919637655556"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Get a Quote
                </a>
                <a
                  href="mailto:stellarglobalsupplies@gmail.com"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}