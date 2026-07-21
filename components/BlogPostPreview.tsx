import Image from 'next/image';

type BlogPostPreviewProps = {
  post: {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
  };
};

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Image src={post.image} alt={post.title} width={500} height={300} />
      <a href={`/blog/${post.slug}`}>Read more</a>
    </div>
  );
}