import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
  return response.data;
};

export const createPost = async (post: {
  title: string;
  content: string;
  author: string;
}): Promise<Post> => {
  const response = await axios.post<Post>(`${API_BASE_URL}/posts`, post);
  return response.data;
};
