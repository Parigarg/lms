import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // ✅ import bcrypt

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    await connectMongo();

    // 🔁 Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    // 🔐 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user with hashed password
    const user = await User.create({ name, email, password: hashedPassword, role });

    return NextResponse.json({
      message: "Registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
