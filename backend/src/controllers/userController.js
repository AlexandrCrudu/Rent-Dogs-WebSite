import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

export const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return new AppError(`User with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
