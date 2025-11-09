"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 py-24 px-6 md:px-16 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-6"
        >
          Learn. Grow. Succeed.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Upgrade your skills with our modern Learning Management System. Join
          as a student or instructor and unlock your full potential!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-10 flex justify-center gap-6"
        >
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg shadow-md transition duration-300"
          >
            Explore Courses
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 text-lg shadow-sm transition duration-300"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-12">
          🌟 Featured Courses
        </h2>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Web Development Fundamentals",
              desc: "Learn HTML, CSS, and JavaScript to build modern websites.",
              image: "/web.png",
            },
            {
              title: "Python for Beginners",
              desc: "Master Python programming with real-world projects.",
              image: "/python.png",
            },
            {
              title: "UI/UX Design Essentials",
              desc: "Create stunning and user-friendly interfaces with design thinking.",
              image: "/default.png",
            },
          ].map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.desc}</p>
                <button
                  onClick={() => router.push("/courses")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition duration-300"
                >
                  View Course
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p className="mt-2 text-purple-100">Students Enrolled</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2 text-purple-100">Courses Available</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">120+</h3>
            <p className="mt-2 text-purple-100">Expert Instructors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">95%</h3>
            <p className="mt-2 text-purple-100">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <h3 className="text-lg font-semibold text-white mb-4">
          © 2025 LMS Project by Pari Garg and Iti Goel
        </h3>
        <p className="text-sm text-gray-400">
          Built with ❤️ using Next.js & TailwindCSS
        </p>
      </footer>
    </>
  );
}
