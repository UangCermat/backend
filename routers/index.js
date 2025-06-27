const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')


router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router