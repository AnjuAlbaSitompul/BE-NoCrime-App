import Jwt from "jsonwebtoken";
import { prismaClient } from "../application/database.js";
const authMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    res
      .status(401)
      .json({ message: "Unauthorized Please Login First", status: "error" });
  }

  try {
    const decodedData = Jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const count = prismaClient.user.count({
      where: {
        id: decodedData.id,
      },
    });

    if (!count) {
      res
        .status(401)
        .json({ message: "Unauthorized Please Login First", status: "error" });
    }

    req.id = decodedData.id;
    next();
  } catch (e) {
    next(e);
  }
};

export { authMiddleware };
