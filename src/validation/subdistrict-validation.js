import Joi from "joi";

const subdistrictValidation = Joi.object({
  name: Joi.string().max(50).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  radius: Joi.number().required(),
});

export { subdistrictValidation };
