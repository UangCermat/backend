const { Goals } = require('../models');

module.exports = class GoalsController {
    static async getGoals(req, res, next) {
        try {
            const userId = req.user.id;
            const goals = await Goals.findAll({
                where: { UserId: userId },
                order: [['createdAt', 'ASC']]
            });
            res.json(goals);
        } catch (err) {
            next(err);
        }
    }

    static async createGoal(req, res, next) {
        try {
            const userId = req.user.id;
            const { title, targetAmount, savedAmount, deadline } = req.body;
            console.log(req.body)

            const newGoal = await Goals.create({
                UserId: userId,
                title,
                targetAmount,
                savedAmount,
                deadline
            });

            res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
        } catch (err) {
            next(err);
        }
    }

    static async updateGoal(req, res, next) {
        try {
            const goalId = req.params.id;
            const userId = req.user.id;
            const { title, targetAmount, savedAmount, deadline } = req.body;
            // console.log(req.body)

            const findGoal = await Goals.findOne({
                where: { id: goalId, UserId: userId }
            });

            if (!findGoal) {
                throw { name: 'NotFound', message: 'Goal not found' };
            }

            await Goals.update({
                title,
                targetAmount,
                savedAmount,
                deadline
            }, {
                where: { id: goalId, UserId: userId }
            });

            res.status(200).json({ message: 'Goal updated successfully' });
        } catch (err) {
            next(err);
        }
    }

    static async deleteGoal(req, res, next) {
        try {
            const goalId = req.params.id;
            const userId = req.user.id;

            const findGoal = await Goals.findOne({
                where: { id: goalId, UserId: userId }
            });

            if (!findGoal) {
                throw { name: 'NotFound', message: 'Goal not found' };
            }

            await Goals.destroy({
                where: { id: goalId, UserId: userId }
            });

            res.status(200).json({ message: 'Goal deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}