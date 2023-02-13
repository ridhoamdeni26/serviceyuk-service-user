const { User, AddressUser } = require("../../../models");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    user_id: "uuid",
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

  const user = await User.findOne({
    where: { id: req.body.user_id },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const createUsersAddress = await AddressUser.create({
    type_address: req.body.type_address,
    user_id: req.body.user_id,
    address: req.body.address,
    province_id: req.body.province_id,
    city_id: req.body.city_id,
    subdistrict_id: req.body.subdistrict_id,
    postal_code: req.body.postal_code,
  });

  if (createUsersAddress) {
    return res.json({
      status: "success",
      data: {
        id: createUsersAddress.id,
        user_id: createUsersAddress.user_id,
        address: createUsersAddress.address,
      },
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Something wrong with created",
    });
  }
};
