import Dog from "../models/dogModel.js";

export const getAllDogs = async (req, res) => {
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
};

export const getDog = async (req, res) => {
  const dog = await Dog.findById(req.params.id);

  if (!dog) {
    console.log(`no document found with ${req.params.id}`);
  }

  res.status(200).json({
    status: "success",
    data: {
      dog,
    },
  });
};
