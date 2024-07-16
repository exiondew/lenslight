import express from "express";
// import { getUsersPage } from "../controllers/pageController.js";
import {follow, getAllUsers, getAUser, unFollow} from "../controllers/userController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(await authenticateToken, getAllUsers);
router.route("/:id").get(getAUser);
router.route("/:id/follow").put(await authenticateToken, follow);
router.route("/:id/unfollow").put(await authenticateToken, unFollow);



export default router;
