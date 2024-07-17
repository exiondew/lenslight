import express from "express";
import {
    createPhoto,
    getAllPhotos,
    getAPhoto,
    deletePhoto,
    updatePhoto
} from "../controllers/photoController.js";

const router = express.Router();

router.get("/", await getAllPhotos);
router.post("/", await createPhoto);

router.route("/:id").get(getAPhoto).delete(deletePhoto).put(updatePhoto);


export default router;
