import express from "express";
import { getDashboardPage } from "../controllers/pageController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(await authenticateToken, await getDashboardPage);

export default router;
