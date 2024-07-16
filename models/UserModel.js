import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: [true, "Username is unique"],
            validate: [
                validator.isAlphanumeric,
                "Username must be only alphanumeric",
            ],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: [true, "Email is unique"],
            validate: [validator.isEmail, "Email is invalid"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        followings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        timestamps: true,
    }
);

schema.pre("save", function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return console.error(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", schema);

export default User;
