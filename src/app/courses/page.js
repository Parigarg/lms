"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [enrolled, setEnrolled] = useState([]);
  const router = useRouter(); // 👈 Add this

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error("❌ Failed to fetch courses", err);
      }
    };

    fetchCourses();

    const enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];
    setEnrolled(enrolledCourses);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnroll = (id) => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];
    if (!enrolledCourses.includes(id)) {
      enrolledCourses.push(id);
      localStorage.setItem("enrolled", JSON.stringify(enrolledCourses));
      setEnrolled(enrolledCourses);
      alert("✅ Enrolled!");
    } else {
      alert("⚠️ Already enrolled.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          📚 Available Courses
        </h1>

        <div className="mb-8 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search courses..."
            className="w-full px-4 py-2 rounded-lg border border-purple-400 shadow-sm bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">No matching courses found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="border p-4 rounded-xl shadow bg-white"
              >
                <h2 className="text-xl font-semibold text-purple-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex gap-2">
                  {/* ✅ Fixed View button */}
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    onClick={() => router.push(`/courses/${course._id}`)}
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    {enrolled.includes(course._id) ? "Enrolled" : "Enroll"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
