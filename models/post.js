const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { DB_TABLES } = require('../config/constant');

const User = require('../models/user')

const Posts = sequelize.define(DB_TABLES.POSTS, {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
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
  tableName: DB_TABLES.POSTS,
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasMany(Posts, {
  foreignKey: 'user_id'
});

module.exports = Posts;