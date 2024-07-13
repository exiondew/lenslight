import express from 'express';
import {getRegisterPage} from "../controllers/pageController.js";
import {createUser} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").get(getRegisterPage).post(createUser);

export default router;