import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router = express.Router();




router.get("/me",verifyToken,async(req:Request,res:Response)=>{
const userId=req.userId;


try{
const user= await User.findById({_id:userId}).select("-password");

if(!user){
  return res.status(400).json({message:"User not found"});
}
res.status(200).json(user);

}catch(error){
  console.log(error);
  res.status(500).json({message:"Something went wrong"})
}
})






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

    return res.status(200).json({message:"Account has been created"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong..." });
  }
});

export default router;