import Jwt from "jsonwebtoken";
import { ResponseError } from "../error/responseError.js";
import { prismaClient } from "../application/database.js";
import { tokenHandler } from "../utils/jwt-utils.js";

const refreshToken = async (request) => {
  // Retrieve the refresh token from the cookies
  const getRefreshToken = request.cookies.refreshToken;

  if (!getRefreshToken) {
    throw new ResponseError("Unauthorized Please Login First", 401);
  }

  // Verify the refresh token
  const decodedRefreshToken = Jwt.verify(
    getRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const count = await prismaClient.user.count({
    where: {
      id: decodedRefreshToken.id,
    },
  });

  if (!count) {
    throw new ResponseError("Unauthorized Please Login First", 401);
  }

  const { accessToken, refreshToken } = tokenHandler({
    id: decodedRefreshToken.id,
  });
  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return result;
};

export default {
  refreshToken,
};
