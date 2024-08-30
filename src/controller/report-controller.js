import reportService from "../service/report-service.js";

const addReport = async (req, res, next) => {
  try {
    const result = await reportService.addReport(req);
    res.status(201).json({
      status: "success",
      data: result,
      message: "Report added successfully",
    });
  } catch (e) {
    console.log(e, "error in report");
    next(e);
  }
};

const getReport = async (req, res, next) => {
  try {
    const response = await reportService.getReport(req);
    res.status(200).json({
      status: "success",
      data: response,
      message: "Report Retrieved Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

const getAdminReport = async (req, res, next) => {
  try {
    const response = await reportService.getAdminReport(req);
    res.status(200).json({
      status: "success",
      data: response,
      message: "Report Retrieved Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

const getDangerReport = async (req, res, next) => {
  try {
    const response = await reportService.getDangerReport(req);
    res.status(200).json({
      status: "success",
      data: response,
      message: "Report Retrieved Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const response = await reportService.updateReport(req);
    res.status(201).json({
      status: "success",
      data: response,
      message: "Report Updated Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    await reportService.deleteReport(req);
    res.status(200).json({
      status: "success",
      message: "Report Deleted Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  addReport,
  getReport,
  getDangerReport,
  getAdminReport,
  updateReport,
  deleteReport,
};
