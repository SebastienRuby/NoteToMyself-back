const Sequelize = require('sequelize');
const sequelize = require('../db/database');

class User extends Sequelize.Model {
	get fullname() {
		return this.username;
	}
}

User.init({
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    username: Sequelize.STRING,
    photo: Sequelize.STRING,
	}, {
    sequelize,
    tableName: "user"
  })

	module.exports = User;