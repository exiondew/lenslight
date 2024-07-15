import Photo from '../models/PhotoModel.js';

const createPhoto = async (req, res) => {
    try {
        const {name, description} = req.body;
        await Photo.create({
            name,
            description,
            user: res.locals.user._id,
        });

        res.status(201).redirect("/dashboard");
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

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({
            _id: req.params.id
        });

        res.render('photo', {photo})
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export {
    createPhoto,
    getAllPhotos,
    getAPhoto,
}