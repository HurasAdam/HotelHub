import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import cloudinary from "cloudinary"
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types"
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();


const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "jpeg",
    "jpg",
    "png",
    "pdf",
    "doc",
    "docx",
    "xls",
    "octet-stream",
  ];

  if (allowedMimeTypes.includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    const error = new Error(`LIMIT_UNEXPECTED_FILE${file.fieldname}`) as any;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;



      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      return res.status(201).json(hotel);
    } catch (error) {
      console.log("Error creating hotel:", error);
      return res.status(500).json({
        message:
          "Something went wrong.Please check your input and try again. If the problem persists, contact support and provide error code",
      });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {



  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" })
  }
})

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId
    })
    res.status(200).json(hotel)
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching hotels" })
  }
})

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {

  const { hotelId } = req.params
  const { userId } = req
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate({ _id: hotelId, userId }, updatedHotel, { new: true })

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
    await hotel.save();
    res.status(200).json(hotel)

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})



const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const response = await cloudinary.v2.uploader.upload(dataURI);
    return response.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;