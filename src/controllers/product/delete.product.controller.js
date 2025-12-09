import { Product } from "../../schemas/product.schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);
  res.status(200).json(new ApiResponse(200, null, SUCCESS_MSG.PRODUCT_DELETED));
});
