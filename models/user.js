const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

module.exports = User;