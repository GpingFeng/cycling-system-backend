/*
 * @description: 用户表映射 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:19:29 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 10:08:42
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false
  },
  association: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;