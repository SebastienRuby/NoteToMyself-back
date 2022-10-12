const Tag = require('../models/tag');
const controllerTag = {

  // Method: PATCH
  // Path: /tag
  // Replace tags for a meal / restaurant
  updateTags: (req, res) => {
    try{
      Tag.setTags(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = controllerTag;
