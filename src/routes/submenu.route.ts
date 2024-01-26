import express from "express";
import SubMenuController from "../controllers/SubMenuController";
import Authorization from "../middlewares/Authorization";
import MenuValidation from "../middlewares/validation/MenuValidation";

const SubMenuRoute = express.Router();

SubMenuRoute.post(
  "/",
  MenuValidation.createSubMenuValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.createSubMenu
);
SubMenuRoute.get(
  "/",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.getListMenu
);
SubMenuRoute.get(
  "/get/all",
  Authorization.Authenticated,
  Authorization.SuperAdminRole,
  SubMenuController.getAllSubMenu
);
SubMenuRoute.get(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.getListMenu
);
SubMenuRoute.put(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.updateSubMenu
);
SubMenuRoute.delete(
  "/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.deleteSoftSubMenu
);
SubMenuRoute.delete(
  "/permanent/:id",
  Authorization.Authenticated,
  Authorization.SuperAdminRole,
  SubMenuController.deleteSubMenuPermanently
);

export default SubMenuRoute;
