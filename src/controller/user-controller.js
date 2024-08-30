import userService from "../service/user-service.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await userService.getUser(req);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { refreshToken, ...rest } = await userService.loginUser(req.body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ status: "success", data: rest });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const result = await userService.logoutUser(req);
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};

export default {
  createUser,
  loginUser,
  logoutUser,
  getUser,
};
