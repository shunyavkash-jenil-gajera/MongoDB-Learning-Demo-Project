import Joi from "joi";

export const createSellerSchema = {
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.number().min(1000000000).max(9999999999).optional(),
  password: Joi.string().min(6).required(),
};
