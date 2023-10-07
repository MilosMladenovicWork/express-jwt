const express = require('express');
const {loginController, tokenController, logoutController} = require('./controllers/auth.controller');

const router = express.Router();

router.post('/login', loginController)
router.post('/token', tokenController)
router.post('/logout', logoutController)

module.exports = router