import express from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/validation/UserValidation";
import Authorization from "../middlewares/Authorization";

const UserRoute = express.Router();

UserRoute.post(
  "/signup",
  UserValidation.RegisterValidation,
  UserController.registerUser
);
UserRoute.post("/login", UserController.loginUser);

export default UserRoute;
