const { City } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const cityId = req.params.id;
    const sqlOptions = ["id", "province_id", "name_city"];
    const checkCityId = await City.findOne({
      attributes: sqlOptions,
      where: { id: cityId },
    });
    if (!checkCityId) {
      return res.status(404).json({
        status: "error",
        message: "City not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: checkCityId,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
