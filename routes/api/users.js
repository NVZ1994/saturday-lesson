const express = require("express");
const router = express.Router();
const { signup, login } = require("../../controllers/usersController");
const userSignUpValidation = require("../../middlewares/validation/userSignUp");
const userLoginValidation = require("../../middlewares/validation/userLogin");

router.post("/signup", userSignUpValidation, signup);
router.post("/login", userLoginValidation, login);
router.post("/logout");
router.get("/current");

module.exports = router;
