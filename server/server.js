import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connection from "./db/connection.js";
import userModel from "./model/user.js";
import upload from "./middleware/upload.js";
import auth from "./middleware/auth.js";
import tweetRoutes from "./routes/tweetRoutes.js";

dotenv.config();

const app = express();

connection();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT ?? 3000
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/tweets", tweetRoutes);
app.get("/", (req, res) => {
  res.json({ name: "samir" });
});

app.post("/api/register", upload.single("profilePic"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { uname, email, pass, gender, dob } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "profile picture required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email already exists" });
    }

    const hashedPass = await bcrypt.hash(pass, 10);

    const user = await userModel.create({
      uname,
      email,
      pass: hashedPass,
      gender,
      dob: new Date(dob),
      profilePic: `/uploads/${req.file.filename}`,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({ message: "registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, pass } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "email not found" });
  }

  const isMatch = await bcrypt.compare(pass, user.pass);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "login success" });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "logged out" });
});

app.get("/api/me", auth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
