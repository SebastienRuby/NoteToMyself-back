const express = require('express');
const mainController = require('../controller/mainController');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', mainController.homePage);

router.post('/signup', userController.doSignUp);
router.post('/login', userController.doLogin);

module.exports = router;
