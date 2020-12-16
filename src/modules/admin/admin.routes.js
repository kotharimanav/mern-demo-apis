const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const Auth = require("../../utils/utils/Auth");

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);

router.use(Auth.checkToken);

router.post("/", adminController.createAdmin);
router.get("/:id", adminController.getAdminById);

// router.post("/", adminController.createAdmin);

module.exports = router;
