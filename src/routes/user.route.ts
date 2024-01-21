import express from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/validation/UserValidation";

const UserRoute = express.Router();

UserRoute.post("/signup", UserController.registerUser);

export default UserRoute;
