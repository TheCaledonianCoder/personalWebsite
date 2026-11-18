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
      {/* Global Fixed Mesh Gradient and Fine Grain Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#F3EFE4",
          backgroundImage: `
            radial-gradient(circle at 0% 45%, #E62E00 0%, rgba(230, 46, 0, 0) 52%),
            radial-gradient(circle at 96% 4%, #45B0C9 0%, rgba(69, 176, 201, 0) 48%),
            radial-gradient(circle at 38% 58%, #F7B538 0%, rgba(247, 181, 56, 0) 58%),
            radial-gradient(circle at 35% 100%, #F26419 0%, rgba(242, 100, 25, 0) 55%),
            radial-gradient(circle at 92% 85%, #F5F1E6 0%, rgba(245, 241, 230, 0) 50%)
          `,
        }}
      >
        {/* Subtle Darkening Layer so White Text Stays Crisp */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Fine Film Grain / Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />
      </div>

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
