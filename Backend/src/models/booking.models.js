import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("booking", bookingSchema);
