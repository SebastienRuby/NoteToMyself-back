const express = require('express');
const restaurant = require('../controller/restaurant');
const router = express.Router();
const cors = require('cors')
const jwtSecret = 'Notetomyselfsecretmessage';

app.use(cors())

// prepare authorization middleware
const authorizationMiddleware = jwt({ secret: jwtSecret, algorithms: ['HS256'] });


router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get("/acceuil",cors,authorizationMiddleware, restaurant.getAllRestaurantFavoriteOnly);
router.get('/recherche',cors,authorizationMiddleware, restaurant.getAllRestaurantByFavorite);
router.get('/recherche/nom-du-restaurant',cors,authorizationMiddleware, restaurant.getRestaurantById);

module.exports = router;