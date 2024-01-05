import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import path from "path";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

// ------ROUTES-----------//
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// -----DB CONNECTION-----//
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on port:${process.env.PORT}`);
  });
});
