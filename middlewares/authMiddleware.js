import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
    const token = req.headers?.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            succeeded: false,
            error: 'No token provided',
        })
    }

    try {
        req.user = await User.findById(
            jwt.verify(token, process.env.JWT_SECRET).userId
        );

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "Not Authenticated",
        })
    }


}

export {
    authenticateToken
}