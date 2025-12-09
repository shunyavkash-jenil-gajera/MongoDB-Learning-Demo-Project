import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { Order } from "../../schemas/order.schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const order = new Order({
    productId,
    userId,
    quantity,
  });

  await order.save();
  res.status(201).json(new ApiResponse(201, order, SUCCESS_MSG.ORDER_CREATED));
});
