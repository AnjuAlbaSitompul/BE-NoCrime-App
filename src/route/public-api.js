import express from "express";
import userController from "../controller/user-controller.js";
import tokenController from "../controller/token-controller.js";

const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Hello World!");
});
publicRouter.post("/api/users", userController.createUser);
publicRouter.post("/api/users/login", userController.loginUser);

publicRouter.get("/api/refreshToken", tokenController.refreshToken);

export { publicRouter };
