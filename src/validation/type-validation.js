import Joi from "joi";
const addTypeValidation = Joi.object({
  name: Joi.string().max(50).required(),
  level: Joi.string().valid("LOW", "MEDIUM", "HIGH", "CRITICAL"),
});

export { addTypeValidation };
