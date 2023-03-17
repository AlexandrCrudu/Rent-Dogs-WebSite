import mongoose from "mongoose";
import Dog from "./dogModel.js";
import catchAsync from "../utils/catchAsync.js";

const bookingSchema = new mongoose.Schema({
  dog: {
    type: mongoose.Schema.ObjectId,
    ref: "Dog",
    required: [true, "Booking must belong to a Dog"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  // "this" points to the current query

  this.populate({
    path: "dog",
    select: "name pricePerDay",
  });
  next();
});

bookingSchema.post("save", async function (doc, next) {
  await Dog.findOneAndUpdate({ _id: this.dog }, { available: false });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
