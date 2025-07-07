"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("lmsUserRole");
    const storedName = localStorage.getItem("lmsUserName");

    if (role !== "admin") {
      alert("⛔ Only Admins allowed!");
      router.push("/login");
      return;
    }

    if (storedName) setName(storedName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/add-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Course added to MongoDB!");
        router.push("/courses");
      } else {
        alert("❌ " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      alert("❌ Failed to add course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      {/* 👋 Greeting Header */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-purple-800">➕ Add New Course</h1>
        <p className="text-lg font-semibold text-purple-700">Hi, {name} 👋</p>
      </div>

      {/* 📝 Form Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6 max-w-4xl mx-auto border border-purple-200"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 text-sm"
            placeholder="e.g. Frontend Basics"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 text-sm"
            placeholder="Enter short course description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow"
          >
            {loading ? "Adding..." : "✅ Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
