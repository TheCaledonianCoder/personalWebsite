import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Blog from "../pages/blog/Blog";
import PostDetail from "../pages/blog/PostDetail";
import Contact from "../pages/contact/Contact";
import Login from "../pages/admin/Login";
import ProjectsPage from "../pages/projects/ProjectsPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCreatePost from "../pages/admin/AdminCreatePost";
import AdminManagePosts from "../pages/admin/AdminManagePosts";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

export function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Static Mesh Gradient Background — single element, zero filters */}
      <div className="mesh-background" />

      {/* Optional: Fine Film Grain / Noise Texture
          (plain low opacity, NO mix-blend-mode — delete this div
          if you don't need the grain) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Layer */}
      <main className="relative z-10 pt-20">
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
      </main>
    </div>
  );
}

export default App;
