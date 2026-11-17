import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  created_at: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await api.get<{ posts: Post[] }>("/posts");
  return response.data.posts;
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const response = await api.get<Post>(`posts/${slug}`);
  return response.data;
}

export async function createPost(post: {
  title: string;
  description: string;
  content: string;
}): Promise<Post> {
  const response = await api.post<Post>("/posts", post);
  return response.data;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post<{ url: string }>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.url;
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<void> {
  await api.post("/login", { username, password });
}

export async function logoutAdmin(): Promise<void> {
  await api.post("/logout");
}

export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await api.get<{ authenticated: boolean }>("/check-auth");
    return response.data.authenticated;
  } catch {
    return false;
  }
}

export async function fetchAdminPosts(): Promise<Post[]> {
  const response = await api.get<{ posts: Post[] }>("/admin/posts");
  return response.data.posts;
}

export async function updatePost(
  id: number,
  post: { title: string; description: string; content: string },
): Promise<void> {
  await api.put(`/posts/${id}`, post);
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}
