"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
  tags: string[];
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  image,
  author,
  tags,
  slug,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 flex flex-col h-full">
      {/* Image */}
      <Link href={`/blog/${slug}`} className="block relative overflow-hidden aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full"
            >
              <Tag size={10} aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} aria-hidden="true" />
              {formattedDate}
            </span>
            <span className="font-medium">{author}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group/link"
        >
          Read More
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
}