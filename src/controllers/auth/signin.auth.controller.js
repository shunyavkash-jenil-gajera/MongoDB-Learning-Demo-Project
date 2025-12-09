import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../schemas/admin.schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateAccessAndRefreshTokens } from "../../services/token.services.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field)) {
    throw new ApiError(400, ERROR_MSG.ALL_FIELDS_ARE_REQUIRED);
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.error("User not found with email:", email);
    throw new ApiError(400, ERROR_MSG.INVALID_CREDENTIALS);
  }

  const isPasswordValid = user.password === password;
  if (!isPasswordValid) {
    console.error("Invalid password for user:", email);
    throw new ApiError(400, ERROR_MSG.INVALID_CREDENTIALS);
  }
  try {
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens({
      id: user._id,
      email: user.email,
    });
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, { secure: false })
      .cookie("refreshToken", refreshToken, { secure: false })
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          SUCCESS_MSG.USER_LOGGED_IN
        )
      );
  } catch (error) {
    console.error("Login Error:", error.message || error);
    throw error;
  }
});
