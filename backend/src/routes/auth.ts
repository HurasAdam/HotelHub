import express,{Request,Response} from "express";
import {check,validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post("/login", [check("email", "Email is required").isEmail(),
check("password","password with 6 or more characters required").isLength({min:6})
],async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }

    const {email,password}=req.body;
    try{
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message:"Invalid email or password"})
}

const isPwMatch=await bcrypt.compare(password,user.password)

if(!isPwMatch){
    return res.status(400).json({message:"Invalid email or password"})
}

const token = jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
    expiresIn:"1d",
});

res.cookie("auth_token",token,{
httpOnly:true,
secure:process.env.NODE_ENV==="production",
maxAge:86400000,
})

res.status(200).json({userId:user._id})
    }
    catch(error){
console.log(error);
return res.status(500).send({message:"Something went wrong..."})
    }
});

router.post("/logout",(req:Request,res:Response)=>{
    res.cookie("auth_token","",{
        expires:new Date(0)
    })

    res.send();
})





router.get("/validate-token",verifyToken,(req:Request,res:Response)=>{
res.status(200).json({userId:req.userId})
})
export default router