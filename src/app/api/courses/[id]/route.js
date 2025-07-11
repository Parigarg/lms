import { connect } from "@/utils/db";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  await connect();
  const course = await Course.findById(params.id);

  if (!course) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ course }), { status: 200 });
}
