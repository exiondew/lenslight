import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

schema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return console.error(err);
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', schema)

export default User;