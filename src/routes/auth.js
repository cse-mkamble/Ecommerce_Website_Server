const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin, authMiddleware } = require("../middleware/auth");

router.post("/isadmin", authController.isAdmin);
// router.post("/signup", authController.postSignup);
router.post('/signup', authController.register)
router.post('/activation', authController.activateEmail)
router.post('/forgot', authController.forgotPassword)
router.post('/reset', authMiddleware, authController.resetPassword)
router.post("/signin", authController.postSignin);
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;
