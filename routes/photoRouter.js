import express from 'express';
import {createPhoto, getAllPhotos} from "../controllers/photoController.js";

const router = express.Router();

router.get("/", await getAllPhotos);
router.post("/", await createPhoto);


export default router;