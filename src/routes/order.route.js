import { Router } from "express";

import { authMiddleware, isSeller } from "../middlewares/auth.middleware.js";
import {
  addQuantityToOrder,
  changeOrderStatus,
  clearUserCart,
  createOrder,
  deleteCartItem,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order/index.order.js";
import { getUserCart } from "../controllers/order/userCart.order.controller.js";

const router = Router();

// for create order
router.post("/create", authMiddleware, createOrder);

// for get all orders
router.get("/all-orders", authMiddleware, getAllOrders);

// for update order Quantity
router.patch("/update/:id", authMiddleware, addQuantityToOrder);

// for update order status
router.patch("/update-status/:id", authMiddleware, isSeller, changeOrderStatus);

// for create user cart
// router.get("/user-cart", getUserCart);

// for get order by id
router.get("/order/:id", authMiddleware, getOrderById);

// for delete cart item
// router.delete("/remove-item/:id", authMiddleware, deleteCartItem);

// for clear user cart
// router.delete("/clear-cart", authMiddleware, clearUserCart);

export default router;
