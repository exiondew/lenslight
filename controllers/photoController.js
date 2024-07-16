import Photo from "../models/PhotoModel.js";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

const createPhoto = async (req, res) => {
  try {
    const tempFilePath = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(tempFilePath, {
      use_filename: true,
      folder: "lenslight",
    });

    const { name, description } = req.body;
    await Photo.create({
      name,
      description,
      user: res.locals.user._id,
      url: result.secure_url,
    });

    unlinkSync(tempFilePath);

    res.status(201).redirect("/dashboard");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = res.locals.user
      ? await Photo.find({
          user: {
            $ne: res.locals.user._id,
          },
        })
      : await Photo.find({});

    res.render("photos", { photos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById({
      _id: req.params.id,
    }).populate("user");

    res.render("photo", { photo });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export { createPhoto, getAllPhotos, getAPhoto };
