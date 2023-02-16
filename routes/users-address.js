const express = require("express");
const router = express.Router();

const userAddressHandler = require("./handler/users-address");

router.post("/", userAddressHandler.create);
router.get("/", userAddressHandler.getUsersAddress);
router.put("/updateAddress/:uuid", userAddressHandler.update);
router.put("/updateMainAddress/:uuid", userAddressHandler.updateMainAddress);
router.delete("/:uuid", userAddressHandler.destroy);

module.exports = router;
