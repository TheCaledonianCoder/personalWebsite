import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchPostBySlug, type Post } from "../../src/services/api";
import { MarkdownImageGallery } from "../../components/MarkdownImageGallery";

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to load post", err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-[92%] lg:w-[50%] mx-auto mt-16 text-slate-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-[92%] lg:w-[50%] mx-auto mt-16">
        <p className="text-slate-600 mb-4">Article not found.</p>
        <Link to="/blog" className="text-blue-600 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="w-[92%] lg:w-[50%] mx-auto mt-12 pb-16">
      <Link
        to="/blog"
        className="inline-block mb-6 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        &larr; Back to articles
      </Link>

      <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
        {post.title}
      </h1>
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-8">
        {new Date(post.created_at).toLocaleDateString("en-GB")}
      </p>

      {/* Markdown Content Renderer with Custom Multi-Image Gallery Support */}
      <div className="text-slate-800 leading-relaxed [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3 [&_h5]:mb-1 [&_p]:mb-4">
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => <MarkdownImageGallery src={src} alt={alt} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default PostDetail;
