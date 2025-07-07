import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt

export async function POST(req) {
  try {
    await connectMongo();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "All fields required." }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials." }), {
        status: 401,
      });
    }

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials." }), {
        status: 401,
      });
    }

    // ✅ Success
    return new Response(
      JSON.stringify({
        message: "Login successful!",
        user: {
          name: user.name,
          role: user.role,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
