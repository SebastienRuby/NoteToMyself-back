const express = require('express');
const router = express.Router();
const controllerMeal = require('../controllers/controllerMeal');
const controllerMemento = require('../controllers/controllerMemento');
const controllerUser = require('../controllers/controllerUser');
const controllerRestaurant = require('../controllers/controllerRestaurant');
const controllerTag = require('../controllers/controllerTag');
const controllerUpload = require('../controllers/controllerUpload');
const authMiddleware = require('../middleware/authMiddleware');

// Router for user
router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);
router.patch('/user', authMiddleware.checkToken, controllerUser.updateUser);
router.delete('/user', authMiddleware.checkToken, controllerUser.deleteUser);

// Router for restaurant
router.get('/restaurants', authMiddleware.checkToken, controllerRestaurant.restaurants);
router.get('/restaurant', authMiddleware.checkToken, controllerRestaurant.restaurant);
router.post('/restaurant', authMiddleware.checkToken, controllerRestaurant.createRestaurant);
router.patch('/restaurant', authMiddleware.checkToken, controllerRestaurant.updateRestaurant);
router.delete('/restaurant', authMiddleware.checkToken, controllerRestaurant.deleteRestaurant);

// Router for meal
router.post('/meal', authMiddleware.checkToken, controllerMeal.createMeal);
router.patch('/meal', authMiddleware.checkToken, controllerMeal.updateMeal);
router.delete('/meal', authMiddleware.checkToken, controllerMeal.deleteMeal);

// Router for memento
router.post('/memento', authMiddleware.checkToken, controllerMemento.createMemento);
router.patch('/memento', authMiddleware.checkToken, controllerMemento.updateMemento);
router.delete('/memento', authMiddleware.checkToken, controllerMemento.deleteMemento);

// Router for meals tags
router.post('/tag/meal', authMiddleware.checkToken, controllerTag.createTagMeal);
router.delete('/tag/meal', authMiddleware.checkToken, controllerTag.deleteTagMeal);

// Router for restaurant tags
router.post('/tag/restaurant', authMiddleware.checkToken, controllerTag.createTagRestaurant);
router.delete('/tag/restaurant', authMiddleware.checkToken, controllerTag.deleteTagRestaurant);

// Router for upload
router.post('/upload', authMiddleware.checkToken, controllerUpload.uploadImage);

module.exports = router;
