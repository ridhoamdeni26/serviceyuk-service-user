const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const slug = require("slug");
const moment = require("moment");

module.exports = async (req, res) => {
  const schema = {
    username: "string|empty:false|min:3|max:20",
    email: "email|empty:false",
    phone: "string|max:12|min:3|empty:false",
    password: "string|min:6|max:255",
    sex: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  // * Check username
  const checkusername = await User.findOne({
    where: { username: req.body.username },
  });

  if (checkusername) {
    return res.status(409).json({
      status: "error",
      message: "username already exist",
    });
  }

  // * Check Email
  const checkEmail = await User.findOne({
    where: { email: req.body.email },
  });

  if (checkEmail) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }

  // * Check Phone
  const checkPhone = await User.findOne({
    where: { phone: req.body.phone },
  });

  if (checkPhone) {
    return res.status(409).json({
      status: "error",
      message: "phone already exist",
    });
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

  // * Confirmation Code
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let confirmationCode = "";
  for (let i = 0; i < 25; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const dob = moment(req.body.dob);
  const slugUsername = slug(req.body.username);

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: password,
    confirmation_code: confirmationCode,
    phone: req.body.phone,
    slug: slugUsername,
    dob: dob.format("YYYY-MM-DD"),
    sex: req.body.sex,
    ip_user: ipUser,
    os: myUseragent.os,
    browser: myUseragent.browser,
    version: myUseragent.version,
    platform: myUseragent.platform,
    registration_type: registrationTypeUser,
    status_id: 3,
  };

  const createUser = await User.create(data);

  return res.status(201).json({
    status: "success",
    message: "User was registered successfully! Please check your email",
    data: {
      id: createUser.id,
      email: createUser.email,
      username: createUser.username,
      confirmation_code: createUser.confirmation_code,
      slug: createUser.slug,
      status: createUser.status,
    },
  });
};
