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
