import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Photo from "../models/PhotoModel.js";

const createUser = async (req, res) => {
    try {
        const findUser = await User.findOne({
            $or: [{username: req.body.username}, {email: req.body.email}],
        });

        if (findUser) {
            const checkUsername = findUser.username === req.body.username;
            const checkEmail = findUser.email === req.body.email;
            let errors = {};

            if (checkEmail && checkUsername) {
                errors["email"] = "Email is already in use";
                errors["username"] = "Username is already in use";
            } else if (findUser.username === req.body.username) {
                errors["username"] = "Username is already in use";
            } else {
                errors["email"] = "Email is already in use";
            }

            return res.status(201).json(errors);
        }
        const user = await User.create(req.body);

        res.status(201).json({success: true});
    } catch (error) {
        let errors = {};

        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        }

        res.status(400).json(errors);
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                success: false, message: "There is no such user",
            });
        }

        if (same) {
            // create token
            const token = createToken(user._id);
            res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});

            return res.redirect("/dashboard");
        } else {
            return res.status(401).json({
                success: false, message: "Passwords do not match",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: {
                $ne: res.locals.user._id,
            },
        });

        res.render("users", {users});
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const getAUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const inFollowers = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id)
        })

        const photos = await Photo.find({
            user: req.params.id,
        });

        res.render("user", {user, photos, inFollowers});
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const follow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(req.params.id, {
            $push: {
                followers: res.locals.user._id,
            }
        }, {
            new: true
        });

        user = await User.findByIdAndUpdate(res.locals.user._id, {
            $push: {
                followings: req.params.id,
            }
        }, {
            new: true
        })

        res.status(200).redirect(`/users/${req.params.id}`);
    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};

const unFollow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(req.params.id, {
            $pull: {
                followers: res.locals.user._id,
            }
        }, {
            new: true
        });

        user = await User.findByIdAndUpdate(res.locals.user._id, {
            $pull: {
                followings: req.params.id,
            }
        }, {
            new: true
        });

        res.status(200).redirect(`/users/${req.params.id}`);

    } catch (err) {
        res.status(500).json({
            success: false, message: err,
        });
    }
};


export {createUser, loginUser, getAllUsers, getAUser, follow, unFollow};
