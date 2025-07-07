import { connectMongo } from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

// ✅ POST: Add new course
export async function POST(req) {
  try {
    const { title, description, category, level } = await req.json();

    // Basic validation
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required." },
        { status: 400 }
      );
    }

    await connectMongo();

    const newCourse = await Course.create({
      title,
      description,
      category: category || "", // optional
      level: level || "",       // optional
    });

    return NextResponse.json(
      { success: true, course: newCourse },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to add course." },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch all courses
export async function GET() {
  try {
    await connectMongo();
    const courses = await Course.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, courses },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses." },
      { status: 500 }
    );
  }
}
