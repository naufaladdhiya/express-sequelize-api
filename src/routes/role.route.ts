import express from "express";
import RoleController from "../controllers/RoleController";
import Authorization from "../middlewares/Authorization";

const RoleRoute = express.Router();

RoleRoute.get("/", Authorization.Authenticated, RoleController.getRole);
RoleRoute.post("/", RoleController.createRole);
RoleRoute.get("/:id", RoleController.getRoleById);
RoleRoute.put("/:id", RoleController.updateRole);
RoleRoute.delete("/:id", RoleController.deleteRole);

export default RoleRoute;
