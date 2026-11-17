import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { createPost, uploadImage } from "../src/services/api";
import { MarkdownImageGallery } from "../components/MarkdownImageGallery";

export function AdminCreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to publish this post?")) return;

    try {
      await createPost({ title, description, content });
      setMessage("Post created successfully!");
      setTitle("");
      setDescription("");
      setContent("");
    } catch {
      setMessage("Failed to create post.");
    }
  };

  const handleSingleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setContent((prev) => prev + `\n\n![Image Description](${imageUrl})\n\n`);
      setMessage("Image uploaded successfully!");
    } catch {
      setMessage("Failed to upload image.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i]);
        uploadedUrls.push(url);
      }

      // Join URLs with a pipe (|) so markdown parses it cleanly as a single image URL parameter
      const galleryMarkdown = `\n\n![Gallery View](${uploadedUrls.join("|")})\n\n`;
      setContent((prev) => prev + galleryMarkdown);
      setMessage("Gallery images uploaded and inserted successfully!");
    } catch {
      setMessage("Failed to upload gallery images.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="w-[94%] lg:w-[85%] mx-auto mt-8 pb-12 relative">
      <Link
        to="/admin"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline"
      >
        &larr; Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Create New Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <p className="p-3 bg-slate-100 text-slate-800 rounded">{message}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter post title..."
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description (Summary for listings)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter a brief summary of the post..."
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 relative">
            <div className="flex items-center space-x-3">
              <label className="block text-sm font-medium text-slate-700">
                Content
              </label>
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full font-medium transition-colors"
              >
                {showGuide ? "Hide Markdown Guide" : "? Markdown Cheat Sheet"}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                {uploading ? "Uploading..." : "+ Single Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSingleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer text-sm font-medium text-indigo-600 hover:underline">
                {uploading ? "Uploading..." : "+ Upload Gallery"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {showGuide && (
            <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Headings
                </span>
                <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                  # Heading 1 (H1)
                </code>
                <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                  ## Heading 2 (H2)
                </code>
                <code className="block bg-white p-1 rounded border border-slate-200">
                  ### Heading 3 (H3)
                </code>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Formatting
                </span>
                <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                  **bold text**
                </code>
                <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                  *italic text*
                </code>
                <code className="block bg-white p-1 rounded border border-slate-200">
                  [Link Text](https://url.com)
                </code>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Lists & Media
                </span>
                <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                  - Bullet item
                </code>
                <code className="block bg-white p-1 rounded border border-slate-200">
                  ![Gallery View](url1|url2)
                </code>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Markdown Editor
              </span>
              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Type your markdown here..."
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Live Preview
              </span>
              <div className="w-full h-[406px] px-4 py-3 rounded-md bg-transparent overflow-y-auto text-sm text-slate-800 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3 [&_h5]:mb-1 [&_p]:mb-3">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  {title || (
                    <span className="text-slate-400 italic font-normal">
                      Untitled Post
                    </span>
                  )}
                </h1>

                {content.trim() ? (
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => (
                        <MarkdownImageGallery src={src} alt={alt} />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-slate-400 italic">
                    Content preview will appear here as you type...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default AdminCreatePost;
