import { ResponseError } from "../error/responseError.js";
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({ message: err.message, status: "error" })
      .end();
  } else if (
    err.name === "PrismaClientKnownRequestError" &&
    err.code === "P2003"
  ) {
    res.status(400).json({ message: "Id is not valid", status: "error" }).end();
  } else {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token", status: "error" }).end();
    } else if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired", status: "error" }).end();
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", status: "error" })
        .end();
    }
  }
};

export { errorMiddleware };
