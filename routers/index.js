const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const TransactionController = require('../controllers/transactionController')
const CategoriesController = require('../controllers/categoriesController')
const GoalsController = require('../controllers/goalsController')


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

router.get('/goals', GoalsController.getGoals)
router.post('/goals', GoalsController.createGoal)
router.put('/goals/:id', GoalsController.updateGoal)
router.delete('/goals/:id', GoalsController.deleteGoal)

module.exports = router