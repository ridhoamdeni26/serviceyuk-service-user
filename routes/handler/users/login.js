const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      email: "email|empty:false",
      password: "string|min:6|max:255",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    // * Check Email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // * Check Status User
    if (user.status_id == 3) {
      return res.status(401).json({
        status: "error",
        message: "User is not granted access, Please confirm your email",
      });
    } else if (user.status_id == 2) {
      return res.status(401).json({
        status: "error",
        message: "User is not active",
      });
    }

    await bcrypt.compare(req.body.password, user.password).then((result) => {
      if (!result) {
        res.status(400).json({
          status: "error",
          message: "Authentication failed, wrong password.",
        });
      } else {
        return res.status(200).json({
          status: "success",
          data: {
            id: user.id,
            username: user.name,
            email: user.email,
            images: user.images,
            phone: user.phone,
            slug: user.slug,
            address_id: user.address_id,
            dob: user.dob,
            sex: user.sex,
            status: user.status,
          },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
