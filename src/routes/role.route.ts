import express from "express";
import RoleController from "../controllers/RoleController";

const router = express.Router();

router.get("/role", RoleController.getRole);
router.post("/role", RoleController.createRole);
router.get("/role/:id", RoleController.getRoleById);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

export default router;
