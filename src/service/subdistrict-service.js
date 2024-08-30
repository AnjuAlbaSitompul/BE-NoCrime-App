import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { subdistrictValidation } from "../validation/subdistrict-validation.js";
import { validate } from "../validation/validate.js";

const getSubdistricts = async () => {
  const result = await prismaClient.subdistrict.findMany({
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
      radius: true,
    },
  });

  return result;
};

const createSubdistrict = async (request) => {
  const subdistrict = validate(subdistrictValidation, request);
  const result = await prismaClient.subdistrict.create({
    data: {
      name: subdistrict.name,
      latitude: subdistrict.latitude,
      longitude: subdistrict.longitude,
      radius: subdistrict.radius,
    },
  });

  logger.info(result);
};

export default {
  getSubdistricts,
  createSubdistrict,
};
