import User from '../models/UserModel.js';
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);


        res.status(201).json({
            succeded: true,
            user
        })
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
            return res.status(200).send("You have successfully logged in");
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


export {
    createUser,
    loginUser
}