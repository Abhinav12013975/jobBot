const express = require('express')
const router = express.Router()
const {signup, login, forgotPassword} = require('../controller/authControllers')

router.post('/signup', signup )
router.post('/login', login )
router.post('/forgotPassword', forgotPassword)

module.exports = router