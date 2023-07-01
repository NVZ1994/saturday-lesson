const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload")

const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  
} = require("../../controllers/usersController");
const userSignUpValidation = require("../../middlewares/validation/userSignUp");
const userLoginValidation = require("../../middlewares/validation/userLogin");
const authenticate = require("../../middlewares/authentificate");

router.post("/register", userSignUpValidation, signup);
router.post("/login", userLoginValidation, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, current);
router.patch('/avatar', authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;
