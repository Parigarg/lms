"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AddCourse() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("✅ Course added successfully!");
      router.push("/courses");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      
      <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-purple-700 text-center">
            Add New Course
          </h2>
          <input
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            placeholder="Course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Add Course
          </button>
        </form>
      </section>
    </>
  );
}
