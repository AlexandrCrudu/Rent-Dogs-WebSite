import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.dogId) filter = { dog: req.params.dogId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

export const getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError(`Review with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.dog) req.body.dog = req.params.dogId;
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  if (!review) {
    return next(new AppError(`Review with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  if (!review) {
    return next(new AppError(`Review with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
