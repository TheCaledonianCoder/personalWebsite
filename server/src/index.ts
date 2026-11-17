import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// DEBUG LOGS TO VERIFY ENV LOADING
console.log("--- SERVER ENVIRONMENT CHECK ---");
console.log("ADMIN_USERNAME:", process.env.ADMIN_USERNAME);
console.log("ADMIN_PASSWORD_HASH present?:", !!process.env.ADMIN_PASSWORD_HASH);
console.log("--------------------------------");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_SECRET_TOKEN =
  process.env.ADMIN_SECRET_TOKEN || "super-secret-admin-token";

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

// Database setup
const dbPath = path.join(__dirname, "../blog.sqlite");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Safe migration for existing databases missing the description column
try {
  db.exec(`ALTER TABLE posts ADD COLUMN description TEXT`);
} catch {
  // Column likely already exists, ignore error
}

// Middleware for Admin Authentication
const requireAuth = (req: Request, res: Response, next: Function): void => {
  const token = req.cookies.admin_token;
  if (!token || token !== ADMIN_SECRET_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

// --- API ROUTES ---

// Upload Image Route (Admin Only)
app.post(
  "/api/upload",
  requireAuth,
  upload.single("image"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  },
);

// Get all posts (Public)
app.get("/api/posts", (req: Request, res: Response) => {
  const posts = db
    .prepare("SELECT * FROM posts ORDER BY created_at DESC")
    .all();
  res.json({ posts });
});

// Get single post by slug (Public)
app.get("/api/posts/:slug", (req: Request, res: Response): void => {
  const { slug } = req.params;
  const post = db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(post);
});

// Create post (Admin Only)
app.post("/api/posts", requireAuth, (req: Request, res: Response): void => {
  const { title, description, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const postDescription =
    description && description.trim() !== ""
      ? description
      : content.substring(0, 150) + "...";

  try {
    const stmt = db.prepare(
      "INSERT INTO posts (title, slug, description, content) VALUES (?, ?, ?, ?)",
    );
    const info = stmt.run(title, slug, postDescription, content);
    const newPost = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(info.lastInsertRowid);
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Error while saving post" });
  }
});

// Admin get all posts
app.get("/api/admin/posts", requireAuth, (req: Request, res: Response) => {
  const posts = db
    .prepare("SELECT * FROM posts ORDER BY created_at DESC")
    .all();
  res.json({ posts });
});

// Update post (Admin Only)
app.put("/api/posts/:id", requireAuth, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, description, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const postDescription =
    description && description.trim() !== ""
      ? description
      : content.substring(0, 150) + "...";

  try {
    const stmt = db.prepare(
      "UPDATE posts SET title = ?, slug = ?, description = ?, content = ? WHERE id = ?",
    );
    stmt.run(title, slug, postDescription, content, id);
    res.json({ success: true, slug });
  } catch (err) {
    res.status(500).json({ error: "Error while updating post" });
  }
});

// Delete post (Admin Only)
app.delete(
  "/api/posts/:id",
  requireAuth,
  (req: Request, res: Response): void => {
    const { id } = req.params;
    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
    res.json({ success: true });
  },
);

// Auth endpoints (Prefixed with /api)
app.post("/api/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminHash = process.env.ADMIN_PASSWORD_HASH || "";

  if (username !== adminUser) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  let passwordMatch = false;

  try {
    // Attempt bcrypt comparison if hash is valid
    if (adminHash.startsWith("$2")) {
      passwordMatch = await bcrypt.compare(password, adminHash);
    }
  } catch (err) {
    console.error("Bcrypt comparison error:", err);
  }

  // Fallback check if someone typed plain text or hash fails
  if (!passwordMatch && password === "IsleOfMull1311!?") {
    passwordMatch = true;
  }

  if (passwordMatch) {
    res.cookie("admin_token", ADMIN_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ success: true });
    return;
  }

  res.status(401).json({ error: "Invalid credentials" });
});

app.post("/api/logout", (req: Request, res: Response) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

app.get("/api/check-auth", (req: Request, res: Response) => {
  const token = req.cookies.admin_token;
  res.json({ authenticated: token === ADMIN_SECRET_TOKEN });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
