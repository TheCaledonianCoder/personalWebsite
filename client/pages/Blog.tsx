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
    return <p className="py-8 text-center text-slate-500">Loading posts...</p>;

  if (posts.length === 0) {
    return (
      <div className="pb-12">
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[350px] sm:h-[400px] flex items-center justify-center text-center px-4 sm:px-6 -mt-6 sm:-mt-10 mb-12 bg-[#F4F5F0]">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C85A17] font-normal mb-4 block">
              Thoughts & Articles
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-slate-900 drop-shadow-sm mb-6 break-words select-none">
              BLOG
            </h1>
            <div className="w-24 h-1 bg-[#C85A17] rounded-full" />
          </div>
        </section>
        <div className="w-[92%] lg:w-[55%] mx-auto">
          <p className="text-slate-500 py-4">No posts available yet.</p>
        </div>
      </div>
    );
  }

  const latestPost = posts[0];
  const recentArticles = posts.slice(1);

  return (
    <div className="pb-12">
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[350px] sm:h-[400px] flex items-center justify-center text-center px-4 sm:px-6 -mt-6 sm:-mt-10 mb-12 bg-[#F4F5F0]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C85A17] font-normal mb-4 block">
            The blog that no one asked for.
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-slate-900 drop-shadow-sm mb-6 break-words select-none">
            BLOG
          </h1>
          <div className="w-24 h-1 bg-[#C85A17] rounded-full" />
        </div>
      </section>

      <div className="w-[92%] lg:w-[55%] mx-auto">
        <div className="mb-14 pb-10 border-b border-slate-200">
          <article className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              <Link
                to={`/posts/${latestPost.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {latestPost.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-6">
              {new Date(latestPost.created_at).toLocaleDateString("en-GB")}
            </p>

            <div className="text-slate-800 leading-relaxed [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3 [&_h5]:mb-1 [&_p]:mb-4">
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
                className="inline-block text-blue-600 font-medium hover:underline"
              >
                Read More &rarr;
              </Link>
            </div>
          </article>
        </div>

        {recentArticles.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Recent Articles
            </h3>
            <div className="space-y-8">
              {recentArticles.map((post) => (
                <article
                  key={post.id}
                  className="border-b border-slate-200 pb-6"
                >
                  <h4 className="text-lg font-semibold mb-1 text-slate-900">
                    <Link
                      to={`/posts/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {post.description}
                  </p>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="inline-block mt-3 text-sm text-blue-600 font-medium hover:underline"
                  >
                    Read More &rarr;
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Blog;
