"use client"; // Required for using useParams and hooks

import { useParams } from "next/navigation"; // To get the course ID from URL
import { useEffect, useState } from "react";
import FeedbackForm from "@/app/components/FeedbackForm"; // Feedback component

const defaultCourses = [
  {
    id: 1,
    title: "Intro to Python",
    description: "Learn Python basics from scratch.",
    content: "Topics: Variables, loops, functions, file handling.",
  },
  {
    id: 2,
    title: "Web Dev Bootcamp",
    description: "HTML, CSS, JavaScript, React — all-in-one.",
    content: "Topics: Responsive websites, DOM, APIs, frontend projects.",
  },
  {
    id: 3,
    title: "DSA Masterclass",
    description: "Data Structures and Algorithms for interviews.",
    content: "Topics: Arrays, trees, graphs, recursion, complexity.",
  },
];

export default function CourseDetail() {
  const params = useParams();
  const id = parseInt(params.id);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("allCourses"));
    const courseList = stored?.length ? stored : defaultCourses;
    const found = courseList.find((c) => c.id === id);
    setCourse(found);
  }, [id]);

  if (!course) {
    return (
      <div className="p-6 text-red-600 font-semibold">❌ Course not found</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-purple-700">{course.title}</h1>
      <p className="text-gray-700 text-lg">{course.description}</p>
      <p className="text-sm text-gray-500">{course.content}</p>

      {/* ✅ Feedback Section */}
      <FeedbackForm courseId={course.id} />
    </div>
  );
}
