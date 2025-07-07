"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function MyCourses() {
  const router = useRouter();
  const [myCourses, setMyCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    const role = localStorage.getItem("lmsUserRole");
    if (role !== "student") {
      alert("⛔ Students only!");
      router.push("/login");
      return;
    }

    const fetchEnrolledCourses = async () => {
      const enrolledIds = JSON.parse(localStorage.getItem("enrolled")) || [];
      const res = await fetch("/api/courses");
      const data = await res.json();

      const enrolledCourses = data.courses.filter((course) =>
        enrolledIds.includes(course._id)
      );

      setMyCourses(enrolledCourses);
    };

    fetchEnrolledCourses();

    // Load progress map
    const storedProgress = JSON.parse(localStorage.getItem("progressMap")) || {};
    setProgressMap(storedProgress);
  }, []);

  const handleContinue = (courseId) => {
    const current = progressMap[courseId] || 0;
    const updated = { ...progressMap, [courseId]: Math.min(current + 10, 100) };

    localStorage.setItem("progressMap", JSON.stringify(updated));
    setProgressMap(updated);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">📘 My Learning Dashboard</h1>

        {myCourses.length === 0 ? (
          <p className="text-gray-500">You haven't enrolled in any course yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
              <div key={course._id} className="border p-5 rounded-xl shadow bg-white">
                <h2 className="text-xl font-semibold mb-2 text-purple-700">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${progressMap[course._id] || 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Progress: {progressMap[course._id] || 0}%
                </p>

                <button
                  onClick={() => handleContinue(course._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  📖 Continue Learning
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
