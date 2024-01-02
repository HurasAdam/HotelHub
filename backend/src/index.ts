import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import {PORT,DB} from "./db/config/config";




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(DB as string).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server listen on port:${PORT}`);
  });
});

app.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).json("DZIALA");
});
