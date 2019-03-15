//routes for retrieving and updating user data
const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

const {
	isAuthenticated
} = require('../services/auth');

router.post('/', isAuthenticated, userController.getUserData);

module.exports = router;