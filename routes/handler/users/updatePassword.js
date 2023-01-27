const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const slug = require("slug");
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    const schema = {
      oldpassword: "string|empty:false|min:6|max:255",
      password: "string|empty:false|min:6|max:255",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    //* Check ID
    const id = req.params.uuid;
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const oldPassword = req.body.oldpassword;

    const newPassword = await bcrypt.hash(req.body.password, 10);

    await bcrypt.compare(oldPassword, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        const userNewPassword = User.update(
          { password: newPassword },
          {
            where: {
              id: user.id,
            },
          }
        );

        if (!userNewPassword) {
          return res.status(500).json({
            status: "error",
            message: "Fail Update Password",
          });
        }

        return res.json({
          status: "success",
          message: "User update password successfully!",
          data: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        return res.status(401).json({ msg: "Invalid old Password" });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
