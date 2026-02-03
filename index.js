import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


 app.use(
  cors({
    origin: "https://frontend-5ea1.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// ✅ DB connect ONCE
connectDB();

// test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully 🚀" });
});

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ❌ REMOVE app.listen()
// ✅ EXPORT app for Vercel
export default app;
