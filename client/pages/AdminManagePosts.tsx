import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  fetchAdminPosts,
  updatePost,
  deletePost,
  uploadImage,
  type Post,
} from "../src/services/api";

export function AdminManagePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editContent, setEditContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        const data = await fetchAdminPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartEdit = (post: Post) => {
    if (!window.confirm("Are you sure you want to edit this post?")) return;
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description || "");
    setEditContent(post.content);
    setShowGuide(false);
  };

  const handleCancelEdit = () => {
    if (
      !window.confirm("Are you sure you want to discard your unsaved changes?")
    )
      return;
    setEditingPostId(null);
  };

  const handleSaveEdit = async (id: number) => {
    if (!window.confirm("Are you sure you want to save these changes?")) return;

    try {
      await updatePost(id, {
        title: editTitle,
        description: editDescription,
        content: editContent,
      });
      setEditingPostId(null);
      const data = await fetchAdminPosts();
      setPosts(data);
    } catch {
      alert("Failed to update post.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      const data = await fetchAdminPosts();
      setPosts(data);
    } catch {
      alert("Failed to delete post.");
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
      setEditContent(
        (prev) => prev + `\n\n![Image Description](${imageUrl})\n\n`,
      );
    } catch {
      alert("Failed to upload image.");
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

      const galleryMarkdown = `\n\n![Gallery View](${uploadedUrls.join(", ")})\n\n`;
      setEditContent((prev) => prev + galleryMarkdown);
    } catch {
      alert("Failed to upload gallery images.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="w-[92%] lg:w-[75%] mx-auto mt-8 pb-12">
      <Link
        to="/admin"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline"
      >
        &larr; Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Manage Articles
      </h1>

      {posts.length === 0 ? (
        <p className="text-slate-500">No posts available to manage.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm space-y-4"
            >
              {editingPostId === post.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Article description"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-3">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Content (Markdown)
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowGuide(!showGuide)}
                          className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full font-medium transition-colors"
                        >
                          {showGuide ? "Hide Guide" : "? Cheat Sheet"}
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="cursor-pointer text-xs font-medium text-blue-600 hover:underline">
                          {uploading ? "Uploading..." : "+ Single Image"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSingleImageUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>
                        <label className="cursor-pointer text-xs font-medium text-indigo-600 hover:underline">
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
                            # H1
                          </code>
                          <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                            ## H2
                          </code>
                          <code className="block bg-white p-1 rounded border border-slate-200">
                            ### H3
                          </code>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block mb-1">
                            Formatting
                          </span>
                          <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                            **bold**
                          </code>
                          <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                            *italic*
                          </code>
                          <code className="block bg-white p-1 rounded border border-slate-200">
                            [Link](url)
                          </code>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block mb-1">
                            Lists & Media
                          </span>
                          <code className="block bg-white p-1 rounded border border-slate-200 mb-0.5">
                            - Item
                          </code>
                          <code className="block bg-white p-1 rounded border border-slate-200">
                            ![Gallery](url1, url2)
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
                          rows={14}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Live Preview
                        </span>
                        <div className="w-full h-[374px] px-4 py-3 rounded-md bg-transparent overflow-y-auto text-sm text-slate-800">
                          <h1 className="text-3xl font-bold text-slate-900 mb-4">
                            {editTitle || (
                              <span className="text-slate-400 italic font-normal">
                                Untitled Post
                              </span>
                            )}
                          </h1>

                          {editContent.trim() ? (
                            <ReactMarkdown>{editContent}</ReactMarkdown>
                          ) : (
                            <p className="text-slate-400 italic">
                              Content preview will appear here as you type...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => handleSaveEdit(post.id)}
                      className="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-1.5 bg-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    Slug: {post.slug} &bull; Published:{" "}
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-slate-600 text-sm mt-2">
                    {post.description}
                  </p>
                  <div className="flex space-x-4 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleStartEdit(post)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminManagePosts;
