import express from "express";
// import { getUsersPage } from "../controllers/pageController.js";
import {getAllUsers, getAUser} from "../controllers/userController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(await authenticateToken, getAllUsers);
router.route("/:id").get(getAUser);

export default router;
