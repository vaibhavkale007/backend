import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

/* ============================
   CORS (MUST BE FIRST)
============================ */
app.use(
  cors({
    origin: "https://frontend-5ea1.vercel.app", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests explicitly (important for Vercel)
app.options("*", cors());

/* ============================
   BODY PARSERS (LIMIT FIX)
============================ */
app.use(express.json({ limit: "4mb" })); // ⚠️ Vercel safe limit
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cookieParser());

/* ============================
   DATABASE
============================ */
connectDB();

/* ============================
   TEST ROUTE
============================ */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully 🚀",
  });
});

/* ============================
   API ROUTES
============================ */
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

/* ============================
   GLOBAL ERROR HANDLER
============================ */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ============================
   EXPORT FOR VERCEL
============================ */
export default app;
