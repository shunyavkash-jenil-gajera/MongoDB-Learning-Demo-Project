import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { Product } from "../../schemas/product.schema.js";

// Get product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);
  res
    .status(200)
    .json(new ApiResponse(200, product, SUCCESS_MSG.PRODUCT_FETCHED));
});

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const { role, id: userId } = req.user;

  let products;

  if (role === "admin") {
    products = await Product.find();
  } else if (role === "seller") {
    products = await Product.find({ userId });
  } else {
    products = await Product.find({ published: true });
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, SUCCESS_MSG.PRODUCTS_FETCHED));
});
