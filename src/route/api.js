import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import subdistrictController from "../controller/subdistrict-controller.js";
import typeController from "../controller/type-controller.js";
import reportController from "../controller/report-controller.js";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.delete("/api/users/logout", userController.logoutUser);
apiRouter.get("/api/users", userController.getUser);

// subdistricts
apiRouter.get("/api/subdistricts", subdistrictController.getSubdistricts);

// type
apiRouter.get("/api/types", typeController.getType);

// report
apiRouter.post("/api/reports", reportController.addReport);
apiRouter.get("/api/users/reports", reportController.getReport);
apiRouter.get("/api/users/reports/danger", reportController.getDangerReport);
