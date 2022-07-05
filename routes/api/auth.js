const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers/");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;