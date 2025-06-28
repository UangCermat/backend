const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const TransactionController = require('../controllers/transactionController')


router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/transactions', TransactionController.getTransactions)
router.post('/transactions', TransactionController.createTransaction)
router.put('/transactions/:id', TransactionController.updateTransaction)
router.delete('/transactions/:id', TransactionController.deleteTransaction)

module.exports = router