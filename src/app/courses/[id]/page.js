"use client"; // Required for useParams and hooks

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FeedbackForm from "@/app/components/FeedbackForm";

export default function CourseDetail() {
  const params = useParams();
  const id = params.id;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data.course);
      } catch (err) {
        console.error("❌ Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  if (loading) return <div className="p-6">⏳ Loading course...</div>;

  if (!course) {
    return (
      <div className="p-6 text-red-600 font-semibold">❌ Course not found</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-purple-700">{course.title}</h1>
      <p className="text-gray-700 text-lg">{course.description}</p>
      <p className="text-sm text-gray-500">
        {course.content || "📘 Course content coming soon..."}
      </p>

      {/* ✅ Feedback Section */}
      <FeedbackForm courseId={course._id} />
    </div>
  );
}
