const { Province, City } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const provinceId = req.query.province;
    const checkProvinceId = await Province.findOne({
      where: { id: provinceId },
    });
    if (!checkProvinceId) {
      return res.status(404).json({
        status: "error",
        message: "Province not found",
      });
    }

    const sqlOptions = ["id", "province_id", "name_city"];
    const dataCity = await City.findAll({
      attributes: sqlOptions,
      where: { province_id: provinceId },
    });

    return res.status(200).json({
      status: "success",
      message: dataCity,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
