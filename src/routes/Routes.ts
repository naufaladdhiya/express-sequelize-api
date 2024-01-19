import express from "express";
import RoleController from "../controllers/RoleController";

const router = express.Router();

router.get("/role", RoleController.getRole);
router.get("/role/:id", RoleController.getRoleById);

export default router;
