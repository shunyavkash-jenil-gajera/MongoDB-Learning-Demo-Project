import Joi from "joi";

export const productCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(1).required(),
  description: Joi.string().min(5).max(500).required(),
  category: Joi.string().min(2).required(),
});
