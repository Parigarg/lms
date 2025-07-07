"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("lmsUserName");
    const userRole = localStorage.getItem("lmsUserRole");
    setName(userName || "");
    setRole(userRole || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4 mb-6">
      {/* Logo / Home */}
      <div
        className="text-xl font-bold text-purple-700 cursor-pointer"
        onClick={() => router.push("/courses")}
      >
        📘 LMS
      </div>

      {/* Navigation Items */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => router.push("/courses")}
          className={`font-medium ${path === "/courses" ? "text-purple-700" : "text-gray-700"}`}
        >
          Courses
        </button>

        <button
          onClick={() => router.push("/my-courses")}
          className={`font-medium ${path === "/my-courses" ? "text-purple-700" : "text-gray-700"}`}
        >
          My Courses
        </button>

        {role === "admin" && (
          <button
            onClick={() => router.push("/add-course")}
            className={`font-medium ${path === "/add-course" ? "text-purple-700" : "text-gray-700"}`}
          >
            Add Course
          </button>
        )}

        {/* Greeting or Auth Options */}
        {name ? (
          <>
            <span className="text-gray-600 font-semibold">Hi, {name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-purple-700"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="text-sm font-medium text-purple-700"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
