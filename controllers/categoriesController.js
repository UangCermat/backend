const { Categories } = require('../models');

module.exports = class CategoriesController {
    static async getCategories(req, res, next) {
        try{
            const userId = req.user.id;
            const categories = await Categories.findAll({
                where: { UserId: userId },
                order: [['name', 'ASC']]
            });
            res.json(categories);
        } catch(err) {
            next(err);
        }
    }
}