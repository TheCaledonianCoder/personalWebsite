import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../src/services/api";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin(username, password);

      // Extract or set the token so localStorage detects it
      const res = response as any;
      const token =
        typeof res === "string"
          ? res
          : res?.token || res?.access_token || "active-admin-session";

      // Save the token to localStorage
      localStorage.setItem("token", token);

      // Notify the navbar instantly that login state changed
      window.dispatchEvent(new Event("storage"));

      // Redirect to the admin dashboard
      navigate("/admin");
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { error?: string } } }).response?.data
          ?.error || "Invalid username, password, or server error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Admin Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
