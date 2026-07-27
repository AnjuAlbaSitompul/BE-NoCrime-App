import Joi from "joi";

const userValidationRequest = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(50).required(),
  password: Joi.string().min(6).max(25).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  expoToken: Joi.string().optional()
});

export { userValidationRequest, loginUserValidation };
