/*
 * @description: sequilize的初始化 
 * @Author: 冯光平 
 * @Date: 2018-04-08 10:29:34 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-04-08 10:29:57
 */
const Sequelize = require('sequelize');
const config = require('../config/db');

// 创建sequelize实例
const sequelize = new Sequelize(config.database, config.user, config.password, Object.assign(config.options, {
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}));

module.exports = sequelize;

