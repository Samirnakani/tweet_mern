import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    pass: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },
    profilePic: {
      type: String, 
      default: "", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
