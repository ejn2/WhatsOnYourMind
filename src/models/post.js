const { DataTypes } = require("sequelize");
const connection = require('../database/connection');
const User = require("./user");

const validation = require('../config/db-validations.json');



// ====================== // Post Model // ======================

const Post = connection.define("post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: validation.strings
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validation: { min: 5 }
    },

    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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

// ====================== // Associations // ======================
Post.belongsTo(User);
User.hasMany(Post);

module.exports = Post;