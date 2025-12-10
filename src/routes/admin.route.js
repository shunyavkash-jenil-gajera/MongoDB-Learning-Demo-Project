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
import use from "../errorHandler/globle.error.handler.js";
const router = express.Router();

router.get("/users", authMiddleware, isAdmin, use(getAllUsers));
router.get("/sellers", authMiddleware, isAdmin, use(getAllSellers));
router.put(
  "/sellers/status",
  authMiddleware,
  isAdmin,
  use(updateSellerIsActive)
);
router.post(
  "/sellers",
  validate(createSellerSchema),
  authMiddleware,
  isAdmin,
  createSeller
);

export default router;
