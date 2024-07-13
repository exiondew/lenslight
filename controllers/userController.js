import User from '../models/UserModel.js';

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


export {
    createUser,
}