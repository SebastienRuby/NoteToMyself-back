const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class Memento extends Sequelize.Model {}

// Initiasation facon Sequelize
Memento.init({
  name: Sequelize.STRING,
  reminder: Sequelize.INTEGER,
  restaurant_id: Sequelize.STRING,
  created_at: Sequelize.DATE,
}, {
  sequelize,
  tableName: 'restaurants'
});

module.exports = Memento;