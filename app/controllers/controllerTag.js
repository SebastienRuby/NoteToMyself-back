const Tag = require('../models/tag');
const controllerTag = {
  // Method: POST
  // Path: /tag/restaurant
  // Create a tag for a restaurant
  createTagRestaurant: (req, res) => {
    try{
      Tag.createTagRestaurant(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: DELETE
  // Path: /tag/restaurant
  // Delete a tag for a restaurant
  deleteTagRestaurant: (req, res) => {
    try{
      Tag.deleteTagRestaurant(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: POST
  // Path: /tag/meal
  // Create a tag for a meal
  createTagMeal: (req, res) => {
    try{
      Tag.createTagMeal(req, res);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: DELETE
  // Path: /tag/meal
  // Delete a tag for a meal
  deleteTagMeal: (req, res) => {
    try{
      Tag.deleteTagMeal(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = controllerTag;
