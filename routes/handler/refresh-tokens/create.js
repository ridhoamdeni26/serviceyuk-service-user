const { User, RefreshToken } = require("../../../models");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.uuid;
  const refreshToken = req.body.refresh_token;

  const schema = {
    refresh_token: "string",
    uuid: "uuid",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { id: userId },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const createRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId,
  });

  if (createRefreshToken) {
    return res.json({
      status: "success",
      data: {
        id: createRefreshToken.id,
      },
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Something wrong with created",
    });
  }
};
