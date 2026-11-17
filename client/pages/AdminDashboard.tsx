import React from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="w-[92%] lg:w-[55%] mx-auto mt-12 pb-12">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">
        Admin Dashboard
      </h1>
      <p className="text-slate-600 mb-8">
        Select an action below to manage your website content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/create"
          className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-blue-500 transition-colors group"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 mb-2">
            Create New Post &rarr;
          </h2>
          <p className="text-sm text-slate-600">
            Write and publish a new article to your blog.
          </p>
        </Link>

        <Link
          to="/admin/manage"
          className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-blue-500 transition-colors group"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 mb-2">
            Manage Posts &rarr;
          </h2>
          <p className="text-sm text-slate-600">
            View, edit, or delete existing articles.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
