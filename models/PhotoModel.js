import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadAt: {
        type: Date,
        default: Date.now
    },
})

const Photo = mongoose.model('Photo', schema)

export default Photo;