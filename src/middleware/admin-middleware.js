import Jwt from "jsonwebtoken";
import { prismaClient } from "../application/database.js";
const adminMiddleware = async (req, res, next) => {
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

    const count = await prismaClient.user.findUnique({
      where: {
        id: decodedData.id,
      },
      select: {
        role: true,
      },
    });

    if (!count) {
      res
        .status(401)
        .json({ message: "Unauthorized Please Login First", status: "error" });
    }
    console.log(count.role, "count get to admin middleware");

    if (count.role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden Request", status: "error" });
    }

    req.id = decodedData.id;
    next();
  } catch (e) {
    next(e);
  }
};

export { adminMiddleware };
