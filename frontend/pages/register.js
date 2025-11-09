"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔗 Base URL (change once for all environments)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // ✅ Store token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to courses
      router.push("/courses");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Role */}
            <div className="flex items-center justify-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Student</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Teacher</span>
              </label>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-center font-medium text-sm">
                ⚠️ {error}
              </p>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              } text-white font-semibold py-3 rounded-lg shadow-md transition duration-300`}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-purple-600 font-semibold hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </motion.div>
      </section>
    </>
  );
}
