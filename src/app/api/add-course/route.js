// src/app/api/add-course/route.js
import { connectMongo } from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, category, level } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and Description are required." }, { status: 400 });
    }

    await connectMongo();

    const course = await Course.create({ title, description, category, level });

    return NextResponse.json({ message: "Course added!", course });
  } catch (err) {
    console.error("Error adding course:", err);
    return NextResponse.json({ error: "Failed to add course." }, { status: 500 });
  }
}
