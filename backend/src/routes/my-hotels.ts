import express, { Request, Response } from "express";
import multer from "multer"
import cloudinary from "cloudinary"
import { HotelType } from "../models/hotel";
const router = express.Router();

const storage = multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024 //5MB
    }
})


router.post("/",upload.array("imageFiles",6), async (req: Request, res: Response) => {
try{
const imageFiles= req.files as Express.Multer.File[]
const newHotel:HotelType = req.body
const uploadPromises= imageFiles.map(async(file)=>{
    const b64=Buffer.from(file.buffer).toString("base64")
    let dataURI= "data:" + file.mimetype+"'base64,"+b64
    const response = await cloudinary.v2.uploader.upload(dataURI);
    return response.url
})

const imageUrls = await Promise.all(uploadPromises);




}
catch(error:){
console.log("Error creating hotel:",error);
return res.status(500).json({message:"Something went wrong.Please check your input and try again. If the problem persists, contact support and provide error code"})
}

});
