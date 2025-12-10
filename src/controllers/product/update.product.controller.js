// import { asyncHandler } from "../../utils/asyncHandler.js";
// import { ApiError } from "../../utils/ApiError.js";
// import { ApiResponse } from "../../utils/ApiResponse.js";
// import { SUCCESS_MSG } from "../../constants/successMessage.js";
// import { ERROR_MSG } from "../../constants/errorMessage.js";
// import { Product } from "../../schemas/product.schema.js";

// export const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   const product = await Product.findByIdAndUpdate(id, updates, { new: true });
//   if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);
//   res
//     .status(200)
//     .json(new ApiResponse(200, product, SUCCESS_MSG.PRODUCT_UPDATED));
// });

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { Product } from "../../schemas/product.schema.js";
import { upload } from "../../utils/multer.js";

export const updateProduct = asyncHandler(async (req, res) => {
  upload.array("images", 10)(req, res, async (err) => {
    if (err) throw new ApiError(400, err.message);

    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id);
    if (!product) throw new ApiError(404, ERROR_MSG.PRODUCT_NOT_FOUND);

    if (updates.removeImages) {
      const removeList = JSON.parse(updates.removeImages);

      product.images = product.images.filter(
        (img) => !removeList.includes(img)
      );
    }
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => {
        return `${req.protocol}://${req.get("host")}/${file.path}`;
      });
    }
    product.images = newImages;
    // if (req.files && req.files.length > 0) {
    //   const newImageUrls = req.files.map((file) => {
    //     return `${req.protocol}://${req.get("host")}/${file.path}`;
    //   });

    //   product.images.push(...newImageUrls);
    // }

    product.name = updates.name || product.name;
    product.price = updates.price || product.price;
    product.description = updates.description || product.description;
    product.category = updates.category || product.category;

    await product.save();

    res
      .status(200)
      .json(new ApiResponse(200, product, SUCCESS_MSG.PRODUCT_UPDATED));
  });
});
