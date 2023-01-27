const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.uuid;

  const schema = {
    uuid: "uuid",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }
  const checkUser = await User.findOne({
    where: { id: userId },
  });
  if (!checkUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const checkRefreshToken = await RefreshToken.findOne({
    where: { user_id: userId },
  });
  if (!checkRefreshToken) {
    return res.status(404).json({
      status: "error",
      message: "User not found in refresh token",
    });
  }

  await RefreshToken.destroy({
    where: { user_id: userId },
  });

  return res.json({
    status: "success",
    message: "Refresh token deleted",
  });
};
