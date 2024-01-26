import express from "express";
import MasterMenuController from "../controllers/MasterMenuController";
import Authorization from "../middlewares/Authorization";
import MenuValidation from "../middlewares/validation/MenuValidation";

const MasterMenuRoute = express.Router();

MasterMenuRoute.post(
  "/",
  MenuValidation.createMenuValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.createMenu
);
MasterMenuRoute.get(
  "/",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.getListMenu
);
MasterMenuRoute.get(
  "/get/all",
  Authorization.Authenticated,
  Authorization.SuperAdminRole,
  MasterMenuController.getAllMenu
);
MasterMenuRoute.get(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.getMenuById
);
MasterMenuRoute.put(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.updateMenu
);
MasterMenuRoute.delete(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.softDeleteMenu
);
MasterMenuRoute.delete(
  "/permanent/:id",
  Authorization.Authenticated,
  Authorization.SuperAdminRole,
  MasterMenuController.deleteMenuPermanenly
);

export default MasterMenuRoute;
