const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class Meal extends Sequelize.Model {}

// Initiasation facon Sequelize
Meal.init({
  name: Sequelize.STRING,
  slug: Sequelize.STRING,
  photo: Sequelize.STRING,
  favorite: Sequelize.BOOLEAN,
  review: Sequelize.STRING,
  restaurant_id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
}, {
  sequelize,
  tableName: 'meal'
});
    
module.exports = Meal;