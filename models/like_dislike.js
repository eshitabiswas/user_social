const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { DB_TABLES } = require('../config/constant');

const User = require('../models/user')
const Posts = require('../models/post')

const Like_dislike = sequelize.define(DB_TABLES.LIKE_DISLIKE, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isLike: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: DB_TABLES.LIKE_DISLIKE,
});

Like_dislike.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Like_dislike, {
    foreignKey: 'user_id'
});

Like_dislike.belongsTo(Posts, {
    foreignKey: 'post_id'
});
Posts.hasMany(Like_dislike, {
    foreignKey: 'post_id'
});

module.exports = Like_dislike;