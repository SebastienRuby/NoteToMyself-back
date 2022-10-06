const express = require('express');
const router = express.Router();
const path = require('path');
const controllerMeal = require('../controllers/controllerMeal');
const controllerMemento = require('../controllers/controllerMemento');
const controllerUser = require('../controllers/controllerUser');
const controllerRestaurant = require('../controllers/controllerRestaurant');
const authMiddleware = require('../middleware/authMiddleware');

// upload image middleware
router.post('/upload', (req, res) => {
  const public = path.join(__dirname, '..', '..', 'public', 'uploads');

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const split = file.name.split('.');
  const fileExtension = split[split.length - 1];
  const fileName = file.name.replace(/\.[^/.]+$/, '');
  console.log(fileExtension);
  const newfileName = `${fileName}-${Date.now()}.${fileExtension}`;
  file.mv(`${public}/${newfileName}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: newfileName, filePath: `/uploads/${newfileName}` });
  });
});


// Router for user
router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);

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

module.exports = router;
