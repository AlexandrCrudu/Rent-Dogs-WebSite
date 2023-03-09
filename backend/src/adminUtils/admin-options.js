import AdminBro from "admin-bro";
import AdminBroMongoose from "admin-bro-mongoose";
import Dog from "../models/dogModel.js";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Review from "../models/reviewModel.js";

AdminBro.registerAdapter(AdminBroMongoose);

const options = {
  resources: [Dog, User, Booking, Review],
  rootPath: "/admin",
};

export default options;
