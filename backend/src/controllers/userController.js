import User from "../models/userModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort();

  const users = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  let filter;

  if (req.originalUrl.includes("/me")) {
    filter = req.currentUserId;
  } else {
    filter = req.params.id;
  }

  const user = await User.findById(filter);

  if (!user) {
    return next(new AppError(`User with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) {
    return next(new AppError(`User with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) {
    return next(new AppError(`User with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getMe = (req, res, next) => {
  req.currentUserId = req.user.id;
  next();
};
