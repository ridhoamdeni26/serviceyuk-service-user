const express = require("express");
const router = express.Router();

const userHandler = require("./handler/users");

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.post("/logout", userHandler.logout);
router.put("/updateImages", userHandler.updateImages);
router.put("/updateUser/:uuid", userHandler.update);
router.put("/updateUserPassword/:uuid", userHandler.updatePassword);
router.get("/get-users", userHandler.getUsers);

module.exports = router;
