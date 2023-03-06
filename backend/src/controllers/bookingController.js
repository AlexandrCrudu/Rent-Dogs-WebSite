import Booking from "../models/bookingModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllBookings = async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
};

export const getUserById = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError(`Booking with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
};

export const updateUser = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  if (!booking) {
    return next(new AppError(`Booking with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  if (!booking) {
    return next(new AppError(`Booking with id:${req.params.id} not found!`));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
