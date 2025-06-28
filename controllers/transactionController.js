const { Transactions } = require('../models')

module.exports = class TransactionController {
    static async getTransactions(req, res) {
        try {
            const userId = req.user.id
            const transactions = await Transactions.findAll({ 
                where: { UserId: userId },
                order: [['date', 'DESC']]
            })
            res.json(transactions)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async addTransaction(req, res) {
        try {
            const UserId = req.user.id

            const { amount, description, date } = req.body

            const transaction = await Transactions.create({
                UserId,
                amount,
                description,
                date
            })

            res.status(201).json(transaction)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}