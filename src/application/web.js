import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { apiRouter } from "../route/api.js";
import { adminRouter } from "../route/admin-api.js";

export const web = express();

web.use(cookieParser());
web.use(express.json());

web.use(publicRouter);
web.use(apiRouter);
web.use(adminRouter);

web.use(errorMiddleware);
