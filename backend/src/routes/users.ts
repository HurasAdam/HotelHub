import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";

const router = express.Router();
import jwt from "jsonwebtoken";
router.post("/register",[
  check("firstName","First Name IS required!").isString(),
  check("lastName","LAST NAME IS REQUIRED").isString(),
  check("email","EMAIL IS REQUIRED").isEmail(),
  check("password","Password with 6 or more characters required").isLength({min:6})
] ,async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({message:errors.array()})
  }
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    user = new User(req.body);
await user.save()

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      maxAge:86400000,
    })

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong..." });
  }
});

export default router;