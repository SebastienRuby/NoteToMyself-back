const client = require('../db/pg');
const restaurant = require('../models/restaurant');
const controllerRestaurant = {

    // Method: GET
    // Path: /restaurants
    // Description: Get all restaurants
    restaurants: (req, res) => {
        try {
            restaurant.getAll(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: GET
    // Path: /restaurants/:id
    // Description: Get one restaurant
    restaurant: (req, res) => {
        try {
            restaurant.getOne(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: POST
    // Path: /restaurants
    // Description: Create a restaurant
    createRestaurant: (req, res) => {
        try {
            restaurant.create(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: PATCH
    // Path: /restaurants/:id
    // Description: Update a restaurant
    updateRestaurant: (req, res) => {
        try {
            restaurant.update(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: DELETE
    // Path: /restaurant
    // Description: Delete a restaurant
    deleteRestaurant: (req, res) => {
        try {
            restaurant.delete(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};


module.exports = controllerRestaurant;