import { ERROR_MSG } from "../../constants/errorMessage.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { Order } from "../../schemas/order.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const changeOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "shipped", "delivered", "canceled"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, ERROR_MSG.INVALID_STATUS);
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

  if (!order) throw new ApiError(404, ERROR_MSG.ORDER_NOT_FOUND);

  res
    .status(200)
    .json(new ApiResponse(200, order, SUCCESS_MSG.ORDER_STATUS_UPDATED));
});
