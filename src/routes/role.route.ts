import express from "express";
import RoleController from "../controllers/RoleController";

const RoleRoute = express.Router();

RoleRoute.get("/", RoleController.getRole);
RoleRoute.post("/", RoleController.createRole);
RoleRoute.get("/:id", RoleController.getRoleById);
RoleRoute.put("/:id", RoleController.updateRole);
RoleRoute.delete("/:id", RoleController.deleteRole);

export default RoleRoute;
