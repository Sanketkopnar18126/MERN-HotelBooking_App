import { Hotel } from "../models/hotel.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createHotelForm = asynchHandler(async (req, res) => {
  const {
    name,
    city,
    country,
    description,
    adultCount,
    childCount,
    facilities,
    starRating,
    type,
    pricePerNight,
  } = req.body;
  console.log("reqFiles", req?.files);
  let imageUrl;
  if (
    req.files &&
    Array.isArray(req.files.imageUrls) &&
    req.files.imageUrls.length > 0
  ) {
    imageUrl = await req.files.imageUrls[0]?.path;
    console.log("imageUrls", imageUrl);
  }

  if (!imageUrl) {
    throw new apiError(404, "Image Url File required");
  }

  const imageUrls = await uploadOnCloudinary(imageUrl);
  console.log("imgurls", imageUrls);

  if (!imageUrls) {
    throw new apiError(400, "imageUrls file is required");
  }
  const hotelData = await Hotel.create({
    name,
    city,
    country,
    description,
    adultCount,
    childCount,
    imageUrls: [imageUrl || ""],
    facilities,
    starRating,
    type,
    pricePerNight,
  });

  console.log("hotelData", hotelData);
  if (!hotelData) {
    throw new apiError(404, "Something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, hotelData, "Hotel successfully created"));
});

export { createHotelForm };
