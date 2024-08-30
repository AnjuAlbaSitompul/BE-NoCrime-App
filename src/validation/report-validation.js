import Joi from "joi";

const addReportValidation = Joi.object({
  typeId: Joi.number().required(),
  subdistrictId: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export { addReportValidation };
