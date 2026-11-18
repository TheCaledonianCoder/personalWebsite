import React from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="w-[92%] lg:w-[55%] mx-auto mt-12 pb-12 text-white">
      <h1 className="text-3xl sm:text-4xl font-light tracking-[0.1em] uppercase text-white drop-shadow-sm">
        Admin Dashboard
      </h1>
      <p className="text-white/60 mt-2 mb-8">
        Select an action below to manage your website content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/create"
          className="group p-6 sm:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
        >
          <h2 className="text-xl font-semibold text-white group-hover:text-[#9FDBE4] transition-colors mb-2">
            Create New Post{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-sm text-white/70">
            Write and publish a new article to your blog.
          </p>
        </Link>

        <Link
          to="/admin/manage"
          className="group p-6 sm:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
        >
          <h2 className="text-xl font-semibold text-white group-hover:text-[#9FDBE4] transition-colors mb-2">
            Manage Posts{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-sm text-white/70">
            View, edit, or delete existing articles.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
