const { Province } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const sqlOptions = ["id", "name_province"];
    const usersProvince = await Province.findAll({
      attributes: sqlOptions,
    });

    return res.status(200).json({
      status: "success",
      data: usersProvince,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
