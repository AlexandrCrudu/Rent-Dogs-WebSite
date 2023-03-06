import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};

export const getUserById = async (req, res, next) => {
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
};

export const updateUser = catchAsync(async (req, res, next) => {
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

export const deleteUser = catchAsync(async (req, res, next) => {
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
