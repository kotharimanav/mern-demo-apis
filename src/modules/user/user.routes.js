const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const Auth = require("../../utils/utils/Auth");

router.use(Auth.checkToken);
router.get("/", userController.userInfo);
router.post("/", userController.createUser);

module.exports = router;
