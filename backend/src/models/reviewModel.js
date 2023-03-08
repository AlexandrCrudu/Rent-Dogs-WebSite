import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    dog: {
      type: mongoose.Schema.ObjectId,
      ref: "Dog",
      required: [true, "Review must belong to a dog"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // "this" points to the current query

  this.populate({
    path: "user",
    select: "username email",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
