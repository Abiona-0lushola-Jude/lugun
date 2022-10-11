const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

// Register a user
router.post('/register', userController.postUser )



router.post('/login', userController.loginUser)

module.exports = router