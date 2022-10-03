const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const controllerUser = require('../controllers/controllerUser');
const controllerRestaurant = require('../controllers/controllerRestaurant');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', mainController.homePage);

// Router for user
router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);


// Router for restaurant
router.get('/restaurants', authMiddleware.checkToken, controllerRestaurant.restaurants)
router.get('/restaurant', authMiddleware.checkToken, controllerRestaurant.restaurant);
router.post('/restaurant', authMiddleware.checkToken, controllerRestaurant.createRestaurant);
router.patch('/restaurant', authMiddleware.checkToken, controllerRestaurant.updateRestaurant);
router.delete('/restaurant', authMiddleware.checkToken, controllerRestaurant.deleteRestaurant);



module.exports = router;
