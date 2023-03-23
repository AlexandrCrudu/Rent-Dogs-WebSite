import Booking from "../models/bookingModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Dog from "../models/dogModel.js";

import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51MlGwQEbCwvIHv2DZKYsP7ZHbfWGzI5B5xneJZctW6QXAZt6q6IZefv3Iq0KtRuT9mxOM84aFdSCSebZ75C2rpB800D5oL3fEP"
);

export const createCheckoutSession = async (req, res) => {
  const dog = await Dog.findById(req.params.dogId);
  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],

    success_url: req.headers.successurlstripe,
    cancel_url: req.headers.failurlstripe,

    customer_email: req.user.email,
    client_reference_id: req.params.dogId,

    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${dog.name} Dog`,
            description: `${dog.description}`,
          },
          unit_amount: dog.pricePerDay * 100,
        },
        quantity: req.body.quantity,
      },
    ],
    mode: "payment",
  });
  res.status(200).json({
    status: "success",
    session,
  });
};

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
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
});

export const createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

export const updateBooking = catchAsync(async (req, res, next) => {
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

export const deleteBooking = catchAsync(async (req, res, next) => {
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
