import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { createPost, uploadImage } from "../../src/services/api";
import { MarkdownImageGallery } from "../../components/MarkdownImageGallery";

/* Small reusable toolbar button */
function ToolButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2.5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/25 border border-white/20 rounded-lg text-white/90 hover:text-white transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}

export function AdminCreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);

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

  /* ── Markdown styling tool ─────────────────────────────── */
  const applyMarkdown = (
    prefix: string,
    suffix: string = prefix,
    placeholder: string = "Your text here",
  ) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const formattedText = `${prefix}${textToInsert}${suffix}`;

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();

      if (selectedText) {
        textarea.setSelectionRange(start, start + formattedText.length);
      } else {
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + placeholder.length,
        );
      }
    });
  };

  return (
    <div className="w-[92%] lg:w-[65%] mx-auto pt-8 pb-16 text-white">
      <Link
        to="/admin"
        className="inline-block mb-6 text-sm text-white/80 hover:text-white transition-colors"
      >
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-3xl sm:text-4xl font-light tracking-[0.1em] uppercase text-white mb-8 drop-shadow-sm">
        Create New Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <p className="p-4 bg-white/20 border border-white/30 text-white text-sm rounded-xl backdrop-blur-md">
            {message}
          </p>
        )}

        {/* ─────────── Section 1 · Post Details ─────────── */}
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            Post Details
          </h2>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter post title..."
              className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Description (Summary for listings)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter a brief summary of the post..."
              className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all resize-none"
            ></textarea>
          </div>
        </section>

        {/* ─────────── Section 2 · Markdown Editor ─────────── */}
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Markdown Editor
              </h2>
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full font-medium transition-colors cursor-pointer"
              >
                {showGuide ? "Hide Markdown Guide" : "? Markdown Cheat Sheet"}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <label className="cursor-pointer text-sm font-medium text-white hover:underline">
                {uploading ? "Uploading..." : "+ Single Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSingleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer text-sm font-medium text-white hover:underline">
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
            <div className="mb-4 p-4 bg-black/30 border border-white/20 rounded-xl text-xs text-white/90 grid grid-cols-1 md:grid-cols-3 gap-4 backdrop-blur-md">
              <div>
                <span className="font-semibold text-white block mb-1">
                  Headings
                </span>
                <code className="block bg-white/10 p-1 rounded border border-white/10 mb-0.5">
                  # Heading 1 (H1)
                </code>
                <code className="block bg-white/10 p-1 rounded border border-white/10 mb-0.5">
                  ## Heading 2 (H2)
                </code>
                <code className="block bg-white/10 p-1 rounded border border-white/10">
                  ### Heading 3 (H3)
                </code>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">
                  Formatting
                </span>
                <code className="block bg-white/10 p-1 rounded border border-white/10 mb-0.5">
                  **bold text**
                </code>
                <code className="block bg-white/10 p-1 rounded border border-white/10 mb-0.5">
                  *italic text*
                </code>
                <code className="block bg-white/10 p-1 rounded border border-white/10">
                  [Link Text](https://url.com)
                </code>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">
                  Lists &amp; Media
                </span>
                <code className="block bg-white/10 p-1 rounded border border-white/10 mb-0.5">
                  - List item
                </code>
                <code className="block bg-white/10 p-1 rounded border border-white/10">
                  ![Gallery View](url1|url2)
                </code>
              </div>
            </div>
          )}

          {/* Formatting toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-3 p-2 bg-black/20 border border-white/10 rounded-xl">
            <ToolButton
              title="Bold"
              onClick={() => applyMarkdown("**", "**", "bold text")}
            >
              <span className="font-bold">B</span>
            </ToolButton>
            <ToolButton
              title="Italic"
              onClick={() => applyMarkdown("*", "*", "italic text")}
            >
              <span className="italic font-serif">I</span>
            </ToolButton>
            <ToolButton
              title="Heading 1"
              onClick={() => applyMarkdown("# ", "", "Heading 1")}
            >
              H1
            </ToolButton>
            <ToolButton
              title="Heading 2"
              onClick={() => applyMarkdown("## ", "", "Heading 2")}
            >
              H2
            </ToolButton>
            <ToolButton
              title="Heading 3"
              onClick={() => applyMarkdown("### ", "", "Heading 3")}
            >
              H3
            </ToolButton>

            <span className="w-px h-5 bg-white/20 mx-1" aria-hidden="true" />

            <ToolButton
              title="Link"
              onClick={() =>
                applyMarkdown("[", "](https://example.com)", "link text")
              }
            >
              Link
            </ToolButton>
            <ToolButton
              title="Bullet list"
              onClick={() => applyMarkdown("- ", "", "list item")}
            >
              &bull; List
            </ToolButton>
            <ToolButton
              title="Quote"
              onClick={() => applyMarkdown("&gt; ", "", "quoted text")}
            >
              &ldquo; Quote
            </ToolButton>
            <ToolButton
              title="Inline code"
              onClick={() => applyMarkdown("`", "`", "code")}
            >
              &lt;/&gt;
            </ToolButton>

            <span className="w-px h-5 bg-white/20 mx-1" aria-hidden="true" />

            <ToolButton
              title="Insert gallery placeholder (url1|url2)"
              onClick={() =>
                applyMarkdown("![", "](url1|url2)", "Gallery View")
              }
            >
              Gallery
            </ToolButton>
          </div>

          <textarea
            ref={editorRef}
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Type your markdown here..."
            className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] font-mono text-sm leading-relaxed resize-y"
          ></textarea>
        </section>

        {/* ─────────── Section 3 · Live Preview ─────────── */}
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">
            Live Preview
          </h2>

          <div className="w-full min-h-[250px] max-h-[500px] px-6 py-4 rounded-xl bg-white/5 border border-white/20 overflow-y-auto text-sm text-white/90 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3 [&_h5]:mb-1 [&_p]:mb-3">
            <h1 className="text-3xl font-bold text-white mb-4">
              {title || (
                <span className="text-white/40 italic font-normal">
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
              <p className="text-white/40 italic">
                Content preview will appear here as you type...
              </p>
            )}
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#1A4D57] hover:bg-[#153d44] active:scale-[0.99] transition-all duration-200 rounded-xl shadow-lg cursor-pointer"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default AdminCreatePost;
