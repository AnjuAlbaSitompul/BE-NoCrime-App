import typeServices from "../service/type-services.js";

const addType = async (req, res, next) => {
  try {
    const result = await typeServices.addType(req.body);
    res
      .status(201)
      .json({ status: "success", message: "Type added successfully" });
  } catch (e) {
    next(e);
  }
};

const getType = async (req, res, next) => {
  try {
    const response = await typeServices.getType();
    res.status(200).json({
      status: "success",
      data: response,
      message: "Type Retrieved Succsessfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  addType,
  getType,
};
