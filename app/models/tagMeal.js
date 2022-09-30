const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class TagMeal extends Sequelize.Model {};

TagMeal.init({
  label: Sequelize.STRING
},{
  sequelize,
  tableName: "tag_meal"
});

// on exporte la class directement !
module.exports = TagMeal;