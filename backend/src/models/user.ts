import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { UserType } from "../shared/types"


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    firstName:{
        type:String,
        required:[true,'FirstName is required'],
        lowercase:true
    },
    lastName:{
        type:String,
        required:[true,"LastName is required"],
        lowercase:true
    }
})

userSchema.pre("save",async function(next){
   if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,8)
   }
   next()
})

const User = mongoose.model<UserType>("User",userSchema)
export default User
