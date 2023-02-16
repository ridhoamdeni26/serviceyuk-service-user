const { City, Subdistrict } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const city_id = req.query.city;
    console.log(city_id);
    const checkCityId = await City.findOne({
      where: { id: city_id },
    });
    if (!checkCityId) {
      return res.status(404).json({
        status: "error",
        message: "City not found",
      });
    }

    const sqlOptions = ["id", "city_id", "name_subdistrict"];
    const dataSubdistrict = await Subdistrict.findAll({
      attributes: sqlOptions,
      where: { city_id: city_id },
    });

    return res.status(200).json({
      status: "success",
      message: dataSubdistrict,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
