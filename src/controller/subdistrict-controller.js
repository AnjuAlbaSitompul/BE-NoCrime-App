import subdistrictService from "../service/subdistrict-service.js";

const getSubdistricts = async (req, res, next) => {
  try {
    const result = await subdistrictService.getSubdistricts();
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    next(e);
  }
};

const createSubdistrict = async (req, res, next) => {
  try {
    const result = await subdistrictService.createSubdistrict(req.body);
    res.status(201).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};

export default {
  getSubdistricts,
  createSubdistrict,
};
