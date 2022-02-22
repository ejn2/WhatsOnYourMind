const Sequelize = require('sequelize');
const config = require("../config/db.json");

const connection = new Sequelize(config);


module.exports = connection;