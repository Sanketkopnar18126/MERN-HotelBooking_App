import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      require: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    pricePerNight: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],

    userRef: {
      type: String,
      required: true,
    },
    // lastUpdated: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("hotel", hotelSchema);
