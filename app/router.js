const express = require('express');
const router = express.Router();
const mainController = require('./controller/mainController');
const controllerUser = require('./controller/controllerUser');


router.get('/', mainController.homePage);

router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);

module.exports = router;
