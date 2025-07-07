// src/app/api/my-courses/route.js
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await User.findOne({ email }).populate("enrolledCourses");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ courses: user.enrolledCourses });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
