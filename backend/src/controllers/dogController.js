import Dog from "../models/dogModel.js";

export const getAllDogs = async (req, res) => {
  const dogs = await Dog.find();

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
