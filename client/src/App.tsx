import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import ProjectsPage from "../pages/ProjectsPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCreatePost from "../pages/AdminCreatePost";
import AdminManagePosts from "../pages/AdminManagePosts";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/posts/:slug" element={<PostDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute>
              <AdminCreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <AdminManagePosts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
