const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", auth, ctrlWrapper(ctrl.add));
router.put("/:id", ctrlWrapper(ctrl.updateById));
router.patch("/:id/favorite", ctrlWrapper(ctrl.updateFavorite));
router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
