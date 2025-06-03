const express = require("express");
const {
  createNewUser,
  checkUser,
  loginUser,
} = require("../controllers/userController");
const { isAuthorization } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/check", checkUser);

router.route("/login").post(loginUser);
router.route("/signup").post(createNewUser);
router.route("/password/forgot").post(createNewUser);

module.exports = router;
