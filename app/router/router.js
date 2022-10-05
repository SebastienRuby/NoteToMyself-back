const express = require('express');
const router = express.Router();
const controllerMeal = require('../controllers/controllerMeal');
const controllerMemento = require('../controllers/controllerMemento');
const controllerUser = require('../controllers/controllerUser');
const controllerRestaurant = require('../controllers/controllerRestaurant');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });


// Router for user
router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);

// Router for restaurant
router.get('/restaurants', authMiddleware.checkToken, controllerRestaurant.restaurants)
router.get('/restaurant', authMiddleware.checkToken, controllerRestaurant.restaurant);
router.post('/restaurant', authMiddleware.checkToken, controllerRestaurant.createRestaurant);
// router.post('/restaurant/upload', authMiddleware.checkToken, controllerRestaurant.uploadRestaurant);
router.patch('/restaurant', authMiddleware.checkToken, controllerRestaurant.updateRestaurant);
// router.patch('/restaurant/upload', authMiddleware.checkToken, controllerRestaurant.uploadRestaurant);
router.delete('/restaurant', authMiddleware.checkToken, controllerRestaurant.deleteRestaurant);

// Router for meal
router.post('/meal', authMiddleware.checkToken, controllerMeal.createMeal);
// router.post('/meal/upload', authMiddleware.checkToken, controllerMeal.uploadMeal);
router.patch('/meal', authMiddleware.checkToken, controllerMeal.updateMeal);
// router.patch('/meal/upload', authMiddleware.checkToken, controllerMeal.uploadMeal);
router.delete('/meal', authMiddleware.checkToken, controllerMeal.deleteMeal);

// Router for memento
router.post('/memento', authMiddleware.checkToken, controllerMemento.createMemento);
router.patch('/memento', authMiddleware.checkToken, controllerMemento.updateMemento);
router.delete('/memento', authMiddleware.checkToken, controllerMemento.deleteMemento);
 
module.exports = router;
