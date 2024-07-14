import User from '../models/UserModel.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);


        res.render("register")
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
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
                success: false,
                message: "There is no such user"
            })
        }

        if (same) {
            // create token
            const token = createToken(user._id)
            res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});

            return res.redirect("/dashboard")

        } else {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}
export {
    createUser,
    loginUser
}