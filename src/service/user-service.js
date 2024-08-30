import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/responseError.js";
import { tokenHandler } from "../utils/jwt-utils.js";
import {
  loginUserValidation,
  userValidationRequest,
} from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";

const createUser = async (request) => {
  const user = validate(userValidationRequest, request);

  const userCount = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (userCount > 0) {
    throw new ResponseError("User Already Exist", 408);
  }

  logger.info(user.password, "before hash");
  user.password = await bcrypt.hash(user.password, 10);
  logger.info(user.password, "after hash");

  const result = await prismaClient.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return result;
};

const getUser = async (request) => {
  const result = await prismaClient.user.findUnique({
    where: {
      id: request.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!result) {
    throw new ResponseError("Not Found", 404);
  }

  return result;
};

const loginUser = async (request) => {
  const login = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { email: login.email },
  });

  if (!user || !(await bcrypt.compare(login.password, user.password))) {
    throw new ResponseError("Invalid Email Or Password", 400);
  }

  await prismaClient.session.deleteMany({ where: { userId: user.id } });
  await prismaClient.notificationToken.deleteMany({
    where: { userId: user.id },
  });

  const { accessToken, refreshToken } = tokenHandler({ id: user.id });

  const [session, notificationToken] = await prismaClient.$transaction([
    prismaClient.session.create({
      data: { userId: user.id, token: refreshToken },
      select: {
        User: { select: { id: true, email: true, role: true, name: true } },
      },
    }),
    prismaClient.notificationToken.create({
      data: { userId: user.id, token: login.expoToken },
    }),
  ]);

  return {
    user: session.User,
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (request) => {
  const result = await prismaClient.session.delete({
    where: {
      userId: request.id,
    },
  });

  if (!result) {
    throw new ResponseError("Not Found", 404);
  }

  return result;
};

export default {
  createUser,
  loginUser,
  logoutUser,
  getUser,
};
