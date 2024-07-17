import Photo from "../models/PhotoModel.js";
import {v2 as cloudinary} from "cloudinary";
import {unlinkSync} from "fs";

const createPhoto = async (req, res) => {
    try {
        const tempFilePath = req.files.image.tempFilePath;
        const result = await cloudinary.uploader.upload(tempFilePath, {
            use_filename: true, folder: "lenslight",
        });

        const {name, description} = req.body;
        await Photo.create({
            name, description, user: res.locals.user._id, url: result.secure_url, imageId: result.public_id
        });

        unlinkSync(tempFilePath);

        res.status(201).redirect("/dashboard");
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const getAllPhotos = async (req, res) => {
    try {
        const photos = res.locals.user ? await Photo.find({
            user: {
                $ne: res.locals.user._id,
            },
        }) : await Photo.find({});

        res.render("photos", {photos});
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id).populate("user");

        if (!photo) {
            return res.redirect("/photos");
        } else {
            return res.render("photo", {photo});
        }


    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        const photoId = photo.imageId;

        await cloudinary.uploader.destroy(photoId);
        await Photo.findOneAndDelete({_id: req.params.id});

        res.status(200).redirect("/dashboard");
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (req.files) {
            const photoId = photo.imageId;
            await cloudinary.uploader.destroy(photoId);

            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: 'lenslight',
                }
            );

            photo.url = result.secure_url;
            photo.imageId = result.public_id;

            unlinkSync(req.files.image.tempFilePath);
        }

        photo.name = req.body.name;
        photo.description = req.body.description;

        photo.save();

        res.status(200).redirect(`/photos/${req.params.id}`);
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

export {createPhoto, getAllPhotos, getAPhoto, deletePhoto, updatePhoto};
