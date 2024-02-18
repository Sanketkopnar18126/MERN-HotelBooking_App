import { Hotel } from "../models/hotel.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//  create hotel form
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
    userRef,
  } = req.body;
  // console.log("reqFiles", req?.files);
  let imageUrl;
  if (
    req.files &&
    Array.isArray(req.files.imageUrls) &&
    req.files.imageUrls.length > 0
  ) {
    imageUrl = await req.files.imageUrls[0]?.path;
    // console.log("imageUrls", imageUrl);
  }

  if (!imageUrl) {
    throw new apiError(404, "Image Url File required");
  }

  const imageUrls = await uploadOnCloudinary(imageUrl);
  // console.log("imgurls", imageUrls);

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
    imageUrls: imageUrls?.url || "",
    facilities,
    starRating,
    type,
    pricePerNight,
    userRef,
  });

  // console.log("hotelData", hotelData);
  if (!hotelData) {
    throw new apiError(404, "Something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, hotelData, "Hotel successfully created"));
});

//  update hotel form

const updateHotelForm = asynchHandler(async (req, res) => {
  try {
    const hotelData = await Hotel.findById(req.params.id);

    if (!hotelData) {
      throw new apiError(404, "data does not found");
    }

    const updatedHotelData = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedHotelData) {
      throw new apiError(404, "Update data form does not exist...");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, updatedHotelData, "Successfully data updated...!")
      );
  } catch (error) {
    console.log("error at updating hotelform", error);
    // Handle other errors or log them as needed
    return res.status(500).json(new apiError(500, "Internal server error"));
  }
});

// Search functionality

const searchHotelByUser = asynchHandler(async (req, res) => {
  try {
    // console.log("req", req);
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let type = req.query.type || [
      "Budget",
      "Boutique",
      "Luxury",
      "Ski Resort",
      "Business",
      "Family",
      "Romantic",
      "Hiking Resort",
      "Cabin",
      "Beach Resort",
      "Golf Resort",
      "Motel",
      "All Inclusive",
      "Pet Friendly",
      "Self Catering",
    ];

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let facilities = req.query.facilities || [
      "Free WiFi",
      "Parking",
      "Airport Shuttle",
      "Family Rooms",
      "Non-Smoking Rooms",
      "Outdoor Pool",
      "Spa",
      "Fitness Center",
    ];

    const hotels = await Hotel.find({
      $or: [
        {
          country: { $regex: searchTerm, $options: "i" },
        },
        { city: { $regex: searchTerm, $options: "i" } },
      ],
      type: { $in: type },
      facilities: { $in: facilities },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    // console.log("Hotels", hotels);
    return res
      .status(200)
      .json(new apiResponse(200, hotels, "Successfully hotels get"));
  } catch (error) {
    console.log("Error occur at search hotel functionality", error);
  }
});

// Get Particular Hotel when user click on viewMore Or in Hotel Name

const getParticularHotel = asynchHandler(async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      throw new apiError(404, "Hotel does not exist in db");
    }

    return res
      .status(200)
      .json(new apiResponse(200, hotel, "Succesfully hotel get it"));
  } catch (error) {
    console.log("error at give Particular Hotel", error);
  }
});

export {
  createHotelForm,
  updateHotelForm,
  searchHotelByUser,
  getParticularHotel,
};
