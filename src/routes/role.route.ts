import express from "express";
import RoleController from "../controllers/RoleController";
import Authorization from "../middlewares/Authorization";

const RoleRoute = express.Router();

RoleRoute.get("/", Authorization.Authenticated, RoleController.getRole);
RoleRoute.get("/:id", Authorization.Authenticated, RoleController.getRoleById);
RoleRoute.post(
  "/",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleController.createRole
);
RoleRoute.put(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleController.updateRole
);
RoleRoute.delete(
  "/:id",
  Authorization.Authenticated,
  Authorization.SuperAdminRole,
  RoleController.deleteRole
);

export default RoleRoute;
