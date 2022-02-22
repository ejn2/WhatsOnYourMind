const { DataTypes } = require("sequelize");
const connection = require('../database/connection');

const validation = require('../config/db-validations.json');



// ====================== // User Model // ======================

const User = connection.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: validation.strings
    },

    email: {
        type: DataTypes.STRING(80),
        unique: true,
        allowNull: false,
        validate: validation.email
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validation.password
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }

});


module.exports = User; 