"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/courses");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("⚠️ All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("lmsUserName", data.user.name);
        localStorage.setItem("lmsUserRole", data.user.role);
        localStorage.setItem("isLoggedIn", "true");

        router.push("/courses");
      } else {
        alert("❌ " + (data.error || "Login failed"));
      }
    } catch (err) {
      alert("❌ Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl flex w-full max-w-6xl overflow-hidden">
        {/* Illustration Side */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-tr from-purple-300 to-indigo-300 p-6">
          <img
            src="/illustrations/undraw_secure-login_m11a.svg"
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Login to LMS
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 cursor-pointer select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Choose your role:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-800 font-medium">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleRoleChange}
                    className="accent-purple-600 w-4 h-4"
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 text-gray-800 font-medium">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={form.role === "admin"}
                    onChange={handleRoleChange}
                    className="accent-purple-600 w-4 h-4"
                  />
                  Admin
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-purple-700 font-semibold cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
