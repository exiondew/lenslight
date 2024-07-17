import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getAPhoto,
    deletePhoto
} from "../controllers/photoController.js";

const router = express.Router();

router.get("/", await getAllPhotos);
router.post("/", await createPhoto);

router.route("/:id").get(getAPhoto).delete(deletePhoto);


export default router;
