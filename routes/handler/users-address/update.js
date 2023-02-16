const { AddressUser } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      type_address: "string|optional:false",
      address: "string|min:10|optional:false",
      province_id: "number|optional:false",
      city_id: "number|optional:false",
      subdistrict_id: "number|optional:false",
      postal_code: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const id = req.params.uuid;
    const userAddress = await AddressUser.findOne({
      where: { id: id },
    });
    if (!userAddress) {
      return res.status(404).json({
        status: "error",
        message: "User Address not found",
      });
    }

    const data = {
      type_address: req.body.type_address,
      address: req.body.address,
      province_id: req.body.province_id,
      city_id: req.body.city_id,
      subdistrict_id: req.body.subdistrict_id,
      postal_code: req.body.postal_code,
    };

    const updateUserAddress = await userAddress.update(data);

    return res.json({
      status: "success",
      message: "User update successfully!",
      data: {
        id: updateUserAddress.id,
        address: updateUserAddress.address,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
