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

    static async createCategory(req, res, next) {
        try{
            const UserId = req.user.id;
            const { name, type } = req.body;

            const newCategory = await Categories.create({
                name,
                type,
                UserId
            });
            // console.log('Creating category:', { name, type, UserId });

            res.status(201).json({message: `Category ${newCategory.name} created successfully`})
        } catch(err) {
            next(err);
        }
    }
}