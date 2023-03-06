import Dog from "../models/dogModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllDogs = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  // adding $ here so that it matches the mongo syntax for querying
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = Dog.find(JSON.parse(queryStr));
  const dogs = await query;

  res.status(200).json({
    status: "success",
    data: {
      dogs,
    },
  });
});

export const getDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.findById(req.params.id);

  if (!dog) {
    return next(new AppError(`No dog found with id:${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      dog,
    },
  });
});

export const createDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      dog,
    },
  });
});

export const updateDog = catchAsync(async (req, rex, next) => {
  const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!dog) {
    return next(new AppError(`No document found with id:${req.params.id}`));
  }

  res.status(200).json({
    status: "success",
    data: {
      dog,
    },
  });
});

export const deleteDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.findByIdAndDelete(req.params.id);

  if (!dog) {
    return next(new AppError(`No document found with id:${req.params.id}`));
  }

  res.status(204).json({
    status: "success",
    data: {
      dog,
    },
  });
});
