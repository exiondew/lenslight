import express from 'express';
import {getLoginPage, getLogout, getRegisterPage} from "../controllers/pageController.js";
import {createUser, loginUser} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").get(getRegisterPage).post(createUser);
router.route("/login").get(getLoginPage).post(loginUser);
router.route("/logout").get(getLogout)


export default router;