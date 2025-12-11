import { Router } from "express";
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
import { validate } from "../middlewares/validation.middleware.js";
import { productCreateSchema } from "../validation/product.validation.js";

const router = Router();

// for create product
router.post(
  "/create",
  validate(productCreateSchema),
  authMiddleware,
  isSeller,
  createProduct
);

// for get all product
router.get("/all-products", authMiddleware, getAllProducts);

// for update product
router.put("/update/:id", authMiddleware, updateProduct);

// for get product details by id
router.get("/product/:id", authMiddleware, getProductById);

// for delete product
router.delete("/delete/:id", authMiddleware, deleteProduct);

// for published product
router.post("/publish/:id", authMiddleware, publishProduct);

// for unpublish product
router.post("/unpublish/:id", authMiddleware, unpublishProduct);

export default router;
