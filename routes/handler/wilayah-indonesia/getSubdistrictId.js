const { Subdistrict } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const subdistrictId = req.params.id;
    const sqlOptions = ["id", "city_id", "name_subdistrict"];
    const checkSubdistrictId = await Subdistrict.findOne({
      attributes: sqlOptions,
      where: { id: subdistrictId },
    });
    if (!checkSubdistrictId) {
      return res.status(404).json({
        status: "error",
        message: "Subdistrict not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: checkSubdistrictId,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
