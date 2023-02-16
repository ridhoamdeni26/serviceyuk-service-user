const { Province } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const provinceId = req.params.id;
    const sqlOptions = ["id", "name_province"];
    const checkProvinceId = await Province.findOne({
      attributes: sqlOptions,
      where: { id: provinceId },
    });
    if (!checkProvinceId) {
      return res.status(404).json({
        status: "error",
        message: "Province not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: checkProvinceId,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
