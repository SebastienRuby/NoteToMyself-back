const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class Restaurant extends Sequelize.Model {}

// Initiasation facon Sequelize
Restaurant.init({
  name: Sequelize.STRING,
  slug: Sequelize.STRING,
  location: Sequelize.STRING,
  favorite: Sequelize.BOOLEAN,
  comment: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
}, {
  sequelize,
  tableName: 'restaurant'
});
    
module.exports = Restaurant;