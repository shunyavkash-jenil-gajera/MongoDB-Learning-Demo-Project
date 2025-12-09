import { Router } from "express";
import use from "../errorHandler/globle.error.handler.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  publishProduct,
  unpublishProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product/index.product.js";
import { authMiddleware, isSeller } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, isSeller, use(createProduct));
router.patch("/update/:id", authMiddleware, use(updateProduct));
router.get("/", authMiddleware, use(getAllProducts));
router.get("/:id", authMiddleware, use(getProductById));
router.delete("/delete/:id", authMiddleware, use(deleteProduct));
router.post("/publish/:id", authMiddleware, use(publishProduct));
router.post("/unpublish/:id", authMiddleware, use(unpublishProduct));

export default router;
