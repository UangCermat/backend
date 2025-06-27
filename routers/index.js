const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/register', UserController.register)

module.exports = router