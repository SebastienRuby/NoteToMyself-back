const express = require('express');
const router = express.Router();

const routerUser = require('./routerUser');
const routerRestaurant = require('./routerRestaurant');
const routerMeal = require('./routerMeal');
const routerMemento = require('./routerMemento');
const routerTagsRestaurant = require('./routerTagsRestaurant');
const routerTagsMeal = require('./routerTagsMeal');
const routerUpload = require('./routerUpload');

// Router for user
router.use(routerUser)

// Router for restaurant
router.use(routerRestaurant)

// Router for meal
router.use(routerMeal)

// Router for memento
router.use(routerMemento)

// Router for meals tags
router.use(routerTagsMeal)

// Router for restaurant tags
router.use(routerTagsRestaurant)

// Router for upload
router.use(routerUpload)

module.exports = router;
