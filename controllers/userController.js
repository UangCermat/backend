const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        try {
            await User.create(req.body);

            console.log("Registering user:", req.body);

            res.status(201).json({
                message: "User registered successfully",
            });
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController;