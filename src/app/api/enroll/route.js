// src/app/api/enroll/route.js
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, courseId } = await req.json();
    await connectMongo();

    const course = await Course.findById(courseId);
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    return NextResponse.json({ message: "Enrolled successfully!" });
  } catch (err) {
    return NextResponse.json({ error: "Enrollment failed." }, { status: 500 });
  }
}
