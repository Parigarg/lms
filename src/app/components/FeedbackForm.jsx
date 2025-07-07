"use client";

import { useState } from "react";

export default function FeedbackForm({ courseId }) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      alert("⚠️ Please provide a rating and a comment.");
      return;
    }

    // Simulate saving feedback
    const existingFeedback =
      JSON.parse(localStorage.getItem("feedbackData")) || [];

    const newFeedback = {
      courseId,
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    const updated = [...existingFeedback, newFeedback];
    localStorage.setItem("feedbackData", JSON.stringify(updated));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg shadow max-w-xl mt-10">
        ✅ Thank you for your feedback!
      </div>
    );
  }

  return (
    <div className="max-w-xl mt-10 mx-auto bg-white shadow-lg border border-purple-200 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">📝 Leave a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 text-sm"
          >
            <option value="">Select a rating</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
            <option value="4">⭐️⭐️⭐️⭐️ Good</option>
            <option value="3">⭐️⭐️⭐️ Average</option>
            <option value="2">⭐️⭐️ Poor</option>
            <option value="1">⭐️ Very Bad</option>
          </select>
        </div>

        {/* Comment Box */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you liked or disliked..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 text-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
