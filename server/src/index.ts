import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

let posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    content:
      "TypeScript brings static typing to JavaScript, making large-scale applications much easier to maintain.",
    author: "Jamie",
  },
  {
    id: "2",
    title: "Building a Fullstack Blog",
    content:
      "Using Node.js, Express, and React together creates a robust web architecture.",
    author: "Jamie",
  },
];

app.get("/api/posts", (req: Request, res: Response) => {
  res.json(posts);
});

app.post("/api/posts", (req: Request, res: Response) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    author: author || "Anonymous",
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
