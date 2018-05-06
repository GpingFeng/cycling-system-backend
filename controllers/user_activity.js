/*
 * @description: 用户与活动关系控制器
 * @Author: 冯光平 
 * @Date: 2018-05-05 10:14:10 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-05 11:11:58
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const UserModel = require('../models/user');
const activityModelFunction = require('../models/activity');
const userActivityFunction =require('../models/user_activity');
const ActivityModel = activityModelFunction(sequelize, Sequelize);
const UserActivityModel = userActivityFunction(sequelize, Sequelize);

module.exports = {
  /**
   * @description 查询用户参加了哪些活动
   */
  getActivityByUser: (req, res, next) => {
    let userId = req.query.id;
    console.log('Gpuser:', userId);

    UserModel.hasOne(UserActivityModel);
    let include = [{
      model: UserActivityModel
    }]

    UserModel.findAll({ include: include }).then((users) => {
      res.sent(users);
      console.log(users);
      next()
    })
  }
}







