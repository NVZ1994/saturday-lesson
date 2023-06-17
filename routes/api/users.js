const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../../controllers/usersController");
const userSignUpValidation = require("../../middlewares/validation/userSignUp");
const userLoginValidation = require("../../middlewares/validation/userLogin");
const userAuth = require("../../middlewares/userAuth")

router.post("/signup", userSignUpValidation, signup);
router.post("/login", userLoginValidation, login);
router.post("/logout", userAuth, logout);
router.get("/current");

module.exports = router;
