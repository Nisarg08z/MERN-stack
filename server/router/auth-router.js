const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const signupSchem = require("../validators/auth-validator");
const  validate  = require("../middlewares/validate-middleware");

router.route("/").get(authControllers.home);
router.route("/register").post( validate(signupSchem),authControllers.register);
router.route("/login").post(authControllers.login);

module.exports = router;