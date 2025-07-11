import { NextResponse } from "next/server";
import { connect } from "@/utils/db";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    await connect();
    const course = await Course.findById(params.id);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

