import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createSeller,
  getAllSellers,
  getAllUsers,
  updateSellerIsActive,
} from "../controllers/admin/index.admin.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createSellerSchema } from "../validation/seller.validation.js";

const router = express.Router();

//for get all users
router.get("/users", authMiddleware, isAdmin, getAllUsers);

// for get all sellers
router.get("/sellers", authMiddleware, isAdmin, getAllSellers);

// for update sellers status
router.put("/sellers/status", authMiddleware, isAdmin, updateSellerIsActive);

// for create seller
router.post(
  "/sellers",
  validate(createSellerSchema),
  authMiddleware,
  isAdmin,
  createSeller
);

export default router;
