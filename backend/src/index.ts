import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import {PORT,DB} from "./db/config/config";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ------ROUTES-----------//
app.use("/api/users",userRoutes)

// -----DB CONNECTION-----//
mongoose.connect(DB as string).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server listen on port:${PORT}`);
  });
});

