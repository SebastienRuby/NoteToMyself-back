const express = require('express');
const mainController = require('../controller/mainController');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/', mainController.homePage);

/* router.get('/quiz/:id',);

router.get('/tags',);

router.get('/tag/:id',);
 */
// ******************* AUTH **************************** //
router.post('/signup', userController.doSignUp);

router.get('/login', userController.showLogin);
router.post('/login', userController.doLogin);


router.get('/logout', userController.logout);



/* router.get('/error/:err', errorController.showError); */


module.exports = router;