import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, type Post } from "./services/api";
import "./App.css";

export function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const newPost = await createPost({
        title,
        content,
        author: author || "Anonymous",
      });
      setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1>TypeScript Blog Skeleton</h1>

      {/* Create Post Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3>Create a New Post</h3>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Publish Post
        </button>
      </form>

      {/* Posts Feed */}
      <h2>Recent Articles</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
            <small style={{ color: "#666" }}>By {post.author}</small>
            <p style={{ marginTop: "0.5rem" }}>{post.content}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default App;
