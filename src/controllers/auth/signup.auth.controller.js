import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../schemas/admin.schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ERROR_MSG } from "../../constants/errorMessage.js";
import { SUCCESS_MSG } from "../../constants/successMessage.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

export const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, ERROR_MSG.USER_ALREADY_EXISTS);
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, ERROR_MSG.REGISTRRING_THE_USER_ERROR);
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdUser,
        token,
      },
      SUCCESS_MSG.USER_REGISTERED
    )
  );
});
