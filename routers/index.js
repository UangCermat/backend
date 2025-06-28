const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const TransactionController = require('../controllers/transactionController')
const CategoriesController = require('../controllers/categoriesController')


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

router.get('/categories', CategoriesController.getCategories)
router.post('/categories', CategoriesController.createCategory)
router.put('/categories/:id', CategoriesController.updateCategory)
router.delete('/categories/:id', CategoriesController.deleteCategory)

module.exports = router