import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { Order } from "../../schemas/order.schema.js";

// Get an order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("productId userId");

  if (!order) throw new ApiError(404, ERROR_MSG.ORDER_NOT_FOUND);

  res.status(200).json(new ApiResponse(200, order, SUCCESS_MSG.ORDER_FETCHED));
});
