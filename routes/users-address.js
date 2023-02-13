const express = require("express");
const router = express.Router();

const userAddressHandler = require("./handler/users-address");

router.post("/", userAddressHandler.create);
router.get("/", userAddressHandler.getUsersAddress);

module.exports = router;
