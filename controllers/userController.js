const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        try {
            await User.create(req.body);

            console.log("Registering user:", req.body);

            res.status(201).json({
                message: "Registered successfully",
            });
        } catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw { name: "BadRequest", message: "Email is required" };
            }

            if (!password) {
                throw { name: "BadRequest", message: "Password is required" };
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const isValid = comparePassword(password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = signToken({ id: user.id });
            res.status(200).json({
                access_token: token,
            });
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController;