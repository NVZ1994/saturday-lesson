const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../../controllers/usersController");
const userSignUpValidation = require("../../middlewares/validation/userSignUp");
const userLoginValidation = require("../../middlewares/validation/userLogin");
const authenticate = require("../../middlewares/authentificate");

router.post("/signup", userSignUpValidation, signup);
router.post("/login", userLoginValidation, login);
router.post("/logout", authenticate, logout);
router.get("/current");

module.exports = router;
