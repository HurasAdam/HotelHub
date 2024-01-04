import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import {PORT,DB} from "./db/config/config";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));

// ------ROUTES-----------//
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

// -----DB CONNECTION-----//
mongoose.connect(DB as string).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server listen on port:${PORT}`);
  });
});

