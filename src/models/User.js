import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },

    // ✅ New field for storing enrolled course IDs
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],
  },
  { timestamps: true }
);

// Avoid model overwrite issues in development
export default mongoose.models.User || mongoose.model("User", UserSchema);
