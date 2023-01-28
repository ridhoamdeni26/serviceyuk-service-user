const register = require("./register");
const login = require("./login");
const updateImages = require("./updateImage");
const update = require("./update");
const updatePassword = require("./updatePassword");
const getUsers = require("./getUsers");
const logout = require("./logout");
const confirmEmail = require("./confirmEmail");

module.exports = {
  register,
  login,
  updateImages,
  update,
  updatePassword,
  getUsers,
  logout,
  confirmEmail,
};
