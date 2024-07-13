import Photo from '../models/PhotoModel.js';

const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body);


        res.status(201).json({
            succeded: true,
            photo
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});

        res.render('photos', {photos})
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export {
    createPhoto,
    getAllPhotos
}