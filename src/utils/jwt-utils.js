import Jwt from "jsonwebtoken";

const tokenHandler = (data) => {
  const accessToken = Jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });
  const refreshToken = Jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });

  return { accessToken, refreshToken };
};

export { tokenHandler };
