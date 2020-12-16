const express = require("express");
const router = express.Router();
const { userRoutes } = require("../modules/user");
const { adminRoutes } = require("../modules/admin");

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
