import express from "express";
import typeController from "../controller/type-controller.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import subdistrictController from "../controller/subdistrict-controller.js";
import reportController from "../controller/report-controller.js";

export const adminRouter = express.Router();

adminRouter.use(adminMiddleware);
// type
adminRouter.post("/api/types", typeController.addType);

// subdistrict
adminRouter.post("/api/subdistricts", subdistrictController.createSubdistrict);
adminRouter.get("/api/admin/reports", reportController.getAdminReport);
adminRouter.patch("/api/admin/reports/:id", reportController.updateReport);
adminRouter.delete("/api/admin/reports/:id", reportController.deleteReport);
