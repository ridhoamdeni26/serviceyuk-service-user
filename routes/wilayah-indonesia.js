const express = require("express");
const router = express.Router();

const userAddressHandler = require("./handler/wilayah-indonesia");

router.get("/province", userAddressHandler.getProvince);
router.get("/province/:id", userAddressHandler.getProvinceId);
router.get("/city", userAddressHandler.getCity);
router.get("/city/:id", userAddressHandler.getCityId);
router.get("/subdistrict", userAddressHandler.getSubdistrict);
router.get("/subdistrict/:id", userAddressHandler.getSubdistrictId);

module.exports = router;
