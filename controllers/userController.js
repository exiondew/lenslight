import User from '../models/UserModel.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {

    try {
        const findUser = await User.findOne({
            $or: [{username: req.body.username}, {email: req.body.email}]
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
            })
        }

        res.status(400).json(errors);
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                success: false, message: "There is no such user"
            })
        }

        if (same) {
            // create token
            const token = createToken(user._id)
            res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});

            return res.redirect("/dashboard")

        } else {
            return res.status(401).json({
                success: false, message: "Passwords do not match"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false, message: err
        })
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}
export {
    createUser, loginUser
}