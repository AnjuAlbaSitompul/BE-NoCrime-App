import { prismaClient } from "../application/database.js";
import { addTypeValidation } from "../validation/type-validation.js";
import { validate } from "../validation/validate.js";

const addType = async (request) => {
  console.log(request, "request get to service add type");
  const type = validate(addTypeValidation, request);
  console.log(type, "type get to service add type");

  const result = await prismaClient.type.create({
    data: {
      name: type.name,
      level: type.level,
    },
  });

  console.log(result);
};

const getType = async () => {
  const result = await prismaClient.type.findMany({
    select: {
      id: true,
      name: true,
      level: true,
    },
  });

  return result;
};

export default {
  addType,
  getType
};
