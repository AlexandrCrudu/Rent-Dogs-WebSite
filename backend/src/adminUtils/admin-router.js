import AdminBroExpress from "@admin-bro/express";
import User from "../models/userModel.js";

const buildAdminRouter = (admin) => {
  const router = AdminBroExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email }).select("+password");

      if (user && (await user.correctPassword(password, user.password)))
        if (user.role === "admin") return user;

      return false;
    },
    cookiePassword: "secretPassword",
  });
  return router;
};

export default buildAdminRouter;
