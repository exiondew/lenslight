import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    uploadAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    imageId: {
        type: String,
        trim: true
    }
});

const Photo = mongoose.model("Photo", schema);

export default Photo;
