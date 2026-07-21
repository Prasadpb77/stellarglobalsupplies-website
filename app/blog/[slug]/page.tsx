import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Stellar Global Supplies",
    };
  }

  const siteUrl = "https://www.stellarglobalsupplies.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Stellar Global Supplies Blog`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "Stellar Global Supplies",
      "industrial supplies",
      "B2B procurement",
      "Pune",
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      siteName: "Stellar Global Supplies",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
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
    publisher: {
      "@type": "Organization",
      name: "Stellar Global Supplies",
      logo: {
        "@type": "ImageObject",
        url: "https://www.stellarglobalsupplies.com/img/logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.stellarglobalsupplies.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Content */}
      <main className="min-h-screen bg-white">
        {/* Hero Section with Featured Image */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <div className="max-w-4xl">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} aria-hidden="true" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Excerpt */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl mb-8">
            <p className="text-lg text-gray-800 italic leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg prose-primary max-w-none">
            {post.content.split("\n").map((paragraph, index) => {
              // Handle headings
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-brand-dark mt-8 mb-4"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold text-brand-dark mt-12 mb-6"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }

              // Handle empty lines
              if (paragraph.trim() === "") {
                return <br key={index} />;
              }

              // Handle bold text
              const formattedText = paragraph.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
              );

              return (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                />
              );
            })}
          </div>

          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary-600">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {post.author}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Expert in industrial supplies and B2B procurement solutions
                </p>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
            >
              <ArrowLeft
                size={20}
                aria-hidden="true"
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Blog
            </Link>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 text-center">
              Ready to Source Industrial Supplies?
            </h3>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Partner with Stellar Global Supplies for premium stainless steel,
              mild steel, and industrial fastening products. Quality guaranteed,
              delivered fast from Pune.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919637655556"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Phone size={20} aria-hidden="true" />
                Get a Quote
              </a>
              <a
                href="mailto:stellarglobalsupplies@gmail.com"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Mail size={20} aria-hidden="true" />
                Contact Us
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-primary-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <Phone size={16} className="text-primary-600" aria-hidden="true" />
                  <span>+91 9637655556</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail size={16} className="text-primary-600" aria-hidden="true" />
                  <span>stellarglobalsupplies@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} className="text-primary-600" aria-hidden="true" />
                  <span>Pune, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}