const { Transactions } = require('../models')

module.exports = class TransactionController {
    static async getTransactions(req, res, next) {
        try {
            const userId = req.user.id
            const transactions = await Transactions.findAll({ 
                where: { UserId: userId },
                order: [['date', 'DESC']]
            })
            res.json(transactions)
        } catch (error) {
            next(error)
        }
    }

    static async createTransaction(req, res, next) {
        try {
            const UserId = req.user.id

            const { type, CategoryId, amount, note, date } = req.body

            const transaction = await Transactions.create({
                UserId,
                type,
                CategoryId,
                amount,
                note,
                date
            })

            res.status(201).json({message: 'Transaction created successfully', transaction})
        } catch (error) {
            next(error)
        }
    }

    static async updateTransaction(req, res, next) {
        try {
            const UserId = req.user.id
            const { id } = req.params
            const { type, CategoryId, amount, note, date } = req.body

            const findTransaction = await Transactions.findOne({ where: { id, UserId } })
            if (!findTransaction) {
                throw { name: 'NotFound', message: 'Transaction not found' }
            }

            await Transactions.update({
                type,
                CategoryId,
                amount,
                note,
                date
            }, {
                where: { id, UserId }
            })

            res.json({ message: 'Transaction updated successfully' })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTransaction(req, res, next) {
        try {
            const UserId = req.user.id
            const { id } = req.params
            const findTransaction = await Transactions.findOne({ where: { id, UserId } })
            if (!findTransaction) {
                throw { name: 'NotFound', message: 'Transaction not found' }
            }

            await Transactions.destroy({ where: { id, UserId } })

            res.json({ message: 'Transaction deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}