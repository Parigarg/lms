"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user exists in localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-700">
          LearnEase
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-purple-700 font-semibold" : "text-gray-700"
            } hover:text-purple-600 transition`}
          >
            Home
          </Link>

          <Link
            href="/courses"
            className={`${
              pathname === "/courses"
                ? "text-purple-700 font-semibold"
                : "text-gray-700"
            } hover:text-purple-600 transition`}
          >
            Courses
          </Link>

          {/* Show Add Course button only for teachers */}
          {user?.role === "teacher" && (
            <Link
              href="/add-course"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
            >
              + Add Course
            </Link>
          )}

          {/* Auth buttons */}
          {!user ? (
            <Link
              href="/login"
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium shadow-sm"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-medium shadow-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
