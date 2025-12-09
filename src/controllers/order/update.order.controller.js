import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { Order } from "../../schemas/order.schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const order = await Order.findByIdAndUpdate(id, { quantity }, { new: true });

  if (!order) throw new ApiError(404, ERROR_MSG.ORDER_NOT_FOUND);

  res.status(200).json(new ApiResponse(200, order, SUCCESS_MSG.ORDER_UPDATED));
});
