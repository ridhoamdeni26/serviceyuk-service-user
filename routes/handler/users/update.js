const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const slug = require("slug");
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    const schema = {
      username: "string|optional:true|min:3|max:20",
      email: "email|optional:true",
      phone: "string|max:12|min:3|optional:true",
      sex: "string|optional",
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

    //* Check Username
    const username = req.body.username;
    if (username) {
      const checkUsername = await User.findOne({
        where: { username },
      });

      if (checkUsername && username == user.username) {
        return res.status(409).json({
          status: "error",
          message: "Username already exist",
        });
      }
    }

    //* Check Email
    const email = req.body.email;
    if (email) {
      const checkEmail = await User.findOne({
        where: { email },
      });

      if (checkEmail && email == user.email) {
        return res.status(409).json({
          status: "error",
          message: "Email already exist",
        });
      }
    }

    //* Check Phone
    const phone = req.body.phone;
    if (phone) {
      const checkPhone = await User.findOne({
        where: { phone },
      });

      if (checkPhone && phone == user.phone) {
        return res.status(409).json({
          status: "error",
          message: "Phone already exist",
        });
      }
    }

    //* GET IP
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (clientIp.substr(0, 7) == "::ffff:") {
      ipUser = clientIp.substr(7);
    }

    //* check Registration Type
    const checkRegistrationType = myUseragent.isMobile;
    if (checkRegistrationType == true) {
      registrationTypeUser = "mobile";
    } else {
      registrationTypeUser = "website";
    }
    const sex = req.body.sex;
    const dob = moment(req.body.dob);
    const slugUsername = slug(username);

    const data = {
      username: username,
      email: email,
      phone: phone,
      slug: slugUsername,
      dob: dob.format("YYYY-MM-DD"),
      sex: sex,
      ip_user: ipUser,
      os: myUseragent.os,
      browser: myUseragent.browser,
      version: myUseragent.version,
      platform: myUseragent.platform,
      registration_type: registrationTypeUser,
    };

    const updateUser = await user.update(data);

    return res.json({
      status: "success",
      message: "User update successfully!",
      data: {
        id: updateUser.id,
        email: updateUser.email,
        username: updateUser.username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
