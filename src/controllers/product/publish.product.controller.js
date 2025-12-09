import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { Product } from "../../schemas/product.schema.js";

// Publish a product
export const publishProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { published: true },
    { new: true }
  );
  if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);
  res
    .status(200)
    .json(new ApiResponse(200, Product, SUCCESS_MSG.PRODUCT_PUBLISHED));
});

// Unpublish a product
export const unpublishProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { published: false },
    { new: true }
  );
  if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);
  res
    .status(200)
    .json(new ApiResponse(200, product, SUCCESS_MSG.PRODUCT_PUBLISHED));
});
