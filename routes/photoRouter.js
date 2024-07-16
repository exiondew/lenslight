import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getAPhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.get("/", await getAllPhotos);
router.post("/", await createPhoto);

router.route("/:id").get(getAPhoto);

export default router;
