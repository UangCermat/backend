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

    static async updateCategory(req, res, next) {
        try{
            const UserId = req.user.id;
            const { id } = req.params;
            const { name, type } = req.body;

            const findCategory = await Categories.findOne({ where: { id, UserId } });
            if (!findCategory) {
                throw { name: 'NotFound', message: 'Category not found' };
            }

            await Categories.update({
                name,
                type
            }, {
                where: { id, UserId }
            });

            res.status(200).json({message: `Category updated successfully`})
        } catch(err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try{
            const UserId = req.user.id;
            const { id } = req.params;

            const findCategory = await Categories.findOne({ where: { id, UserId } });
            if (!findCategory) {
                throw { name: 'NotFound', message: 'Category not found' };
            }

            await Categories.destroy({
                where: { id, UserId }
            });

            res.status(200).json({message: `Category deleted successfully`})
        } catch(err) {
            next(err);
        }
    }
}