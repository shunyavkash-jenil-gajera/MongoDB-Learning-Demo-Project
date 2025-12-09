import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createSeller,
  getAllSellers,
  getAllUsers,
  updateSellerIsActive,
} from "../controllers/admin/index.admin.js";
const router = express.Router();

router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/sellers", authMiddleware, isAdmin, getAllSellers);
router.put("/sellers/status", authMiddleware, isAdmin, updateSellerIsActive);
router.post("/sellers", authMiddleware, isAdmin, createSeller);

export default router;
