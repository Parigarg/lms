"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();

        if (res.ok) {
          setCourses(data.courses);
        } else {
          alert("❌ Failed to load courses: " + data.error);
        }
      } catch (error) {
        alert("❌ Error fetching courses.");
      }

      const enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];
      setEnrolled(enrolledCourses);
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnroll = (id) => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];
    if (!enrolledCourses.includes(id)) {
      enrolledCourses.push(id);
      localStorage.setItem("enrolled", JSON.stringify(enrolledCourses));
      setEnrolled([...enrolledCourses]);
      alert("✅ Enrolled successfully!");
    } else {
      alert("⚠️ You're already enrolled.");
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
                className="bg-white border p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-purple-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {course.category && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                      {course.category}
                    </span>
                  )}
                  {course.level && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                      {course.level}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                    View
                  </button>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
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
