const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw { name: 'Unauthorized', message: 'Invalid token' };
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            throw { name: 'Unauthorized', message: 'Invalid token' };
        }

        const validToken = verifyToken(token);
        if (!validToken) {
            throw { name: 'Unauthorized', message: 'Invalid token' };
        }

        // console.log("Authenticated user:", validToken);

        const user = await User.findByPk(validToken.id);
        if (!user) {
            throw { name: 'Unauthorized', message: 'User not found' };
        }

        // console.log(user)

        req.user = user
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;