import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchPosts, type Post } from "../src/services/api";
import { MarkdownImageGallery } from "../components/MarkdownImageGallery";

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="py-20 text-center text-white/75">Loading posts...</p>;

  if (posts.length === 0) {
    return (
      <div className="w-[92%] lg:w-[55%] mx-auto pt-8 pb-12 text-white">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold mb-2 block drop-shadow-sm">
            Thoughts & Articles
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-sm mb-4 select-none">
            BLOG
          </h1>
          <div className="w-24 h-1 bg-[#1A4D57] rounded-full shadow-sm mx-auto" />
        </div>
        <p className="text-white/80 py-4 text-center">
          No posts available yet.
        </p>
      </div>
    );
  }

  const latestPost = posts[0];
  const recentArticles = posts.slice(1);

  return (
    <div className="w-[92%] lg:w-[55%] mx-auto pt-8 pb-16 text-white">
      {/* Centered Page Title Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-sm mb-4 select-none">
          BLOG
        </h1>
        <span className="text-xs uppercase tracking-[0.3em] text-white font-semibold mb-2 block drop-shadow-sm">
          The blog that no one asked for.
        </span>
        {/* <div className="w-24 h-1 bg-[#1A4D57] rounded-full shadow-sm mx-auto" /> */}
      </div>

      {/* Latest Post Section */}
      <div className="mb-14 pb-10 border-b border-white/20">
        <article className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            <Link
              to={`/posts/${latestPost.slug}`}
              className="hover:text-[#1A4D57] transition-colors"
            >
              {latestPost.title}
            </Link>
          </h2>
          <p className="text-xs text-white/75 uppercase tracking-wider mb-6">
            {new Date(latestPost.created_at).toLocaleDateString("en-GB")}
          </p>

          <div className="text-white/90 leading-relaxed [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3 [&_h5]:mb-1 [&_p]:mb-4">
            <ReactMarkdown
              components={{
                img: ({ src, alt }) => (
                  <MarkdownImageGallery src={src} alt={alt} />
                ),
              }}
            >
              {latestPost.content}
            </ReactMarkdown>
          </div>

          <div className="pt-2">
            <Link
              to={`/posts/${latestPost.slug}`}
              className="inline-block text-white font-medium hover:underline"
            >
              Read More &rarr;
            </Link>
          </div>
        </article>
      </div>

      {/* Recent Articles Section */}
      {recentArticles.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-6 text-white">Recent Articles</h3>
          <div className="space-y-8">
            {recentArticles.map((post) => (
              <article key={post.id} className="border-b border-white/20 pb-6">
                <h4 className="text-lg font-semibold mb-1 text-white">
                  <Link
                    to={`/posts/${post.slug}`}
                    className="hover:text-[#1A4D57] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h4>
                <p className="text-xs text-white/75 uppercase tracking-wider mb-2">
                  {new Date(post.created_at).toLocaleDateString("en-GB")}
                </p>

                <p className="text-white/80 text-sm leading-relaxed">
                  {post.description}
                </p>

                <Link
                  to={`/posts/${post.slug}`}
                  className="inline-block mt-3 text-sm text-white font-medium hover:underline"
                >
                  Read More &rarr;
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Blog;
