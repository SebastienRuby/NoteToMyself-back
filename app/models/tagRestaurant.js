const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class TagRestaurant extends Sequelize.Model {};

TagRestaurant.init({
  label: Sequelize.STRING
},{
  sequelize,
  tableName: "tag_restaurant"
});

// on exporte la class directement !
module.exports = TagRestaurant;