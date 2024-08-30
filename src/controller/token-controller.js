import tokenService from "../service/token-service.js";

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken, ...rest } = await tokenService.refreshToken(req);
    res.clearCookie("refreshToken");
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

export default {
  refreshToken,
};
