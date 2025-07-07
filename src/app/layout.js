"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [name, setName] = useState("");
  const router = useRouter();

  // ✅ Load user's name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <html lang="en">
      <body>
        {/* ✅ Navbar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md px-6 py-3 flex justify-between items-center">
          {/* 🔗 Logo */}
          <Link href="/" className="text-2xl font-extrabold text-purple-800 flex items-center gap-2">
            🎓 LMS
          </Link>

          {/* 🔗 Navigation Links */}
          <nav className="flex gap-4 items-center text-sm font-medium text-gray-700">
            <Link href="/courses" className="hover:underline hover:text-purple-600">Courses</Link>
            <Link href="/my-courses" className="hover:underline hover:text-purple-600">My Courses</Link>
            <Link href="/add-course" className="hover:underline hover:text-purple-600">Add Course</Link>

            {/* 👤 Name + Logout */}
            {name ? (
              <>
                <span className="text-purple-700 font-semibold">Hi, {name} 👋</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </header>

        {/* ✅ Main Body */}
        <main className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 min-h-screen px-4 sm:px-10 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
