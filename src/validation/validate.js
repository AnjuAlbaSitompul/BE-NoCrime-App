import { ResponseError } from "../error/responseError.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(result.error.message, 400);
  } else {
    return result.value;
  }
};

export { validate };
