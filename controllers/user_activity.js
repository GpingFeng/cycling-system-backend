/*
 * @description: 用户与活动关系控制器
 * @Author: 冯光平 
 * @Date: 2018-05-05 10:14:10 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-11 22:17:35
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const UserModelFun = require('../models/user');
const UserModel = UserModelFun(sequelize, Sequelize);
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
    // 根据用户Id查询到参加的活动Id列表
    UserActivityModel.findAll({
      where: { user_id: userId }
    }).then(userActivities => {
      var activities = [];
      var promiseArr = [];
      // 通过活动Id列表查询各个活动的详细信息
      userActivities.forEach(userActivity => {
        var activityId = userActivity.act_id;
        promiseArr.push(
          ActivityModel.findOne({
            where: { id: activityId }
          }).then((activity => {
            activities.push(activity);
          }))
        )
      });

      // 存在异步问题，使用Promise解决
      Promise.all(promiseArr)
        .then(() => {
          res.locals.returns = {
            code: '0000',
            data: activities
          }
          next();
        })
    })
  },
  /**
   * @description 该活动有哪些用户参加
   */
  getUsersByactivity: (req, res, next) => {
    var actId = req.query.actId;
    UserActivityModel.findAll({
      where: { act_id: actId }
    }).then(userActivities => {
      var usersArr = [];
      var activityPromiseArr = [];
      userActivities.forEach(userActivity => {
        var userId = userActivity.user_id;
        activityPromiseArr.push(
          UserModel.findOne({
            where: { id: userId }
          }).then(user => {
            usersArr.push(user)
          })
        )
      })
      
      Promise.all(activityPromiseArr)
        .then(() => {
          res.locals.returns = {
            code: '0000',
            data: usersArr
          }
          next();
        })
      
    })
  },
  /**
   * @description 用户参加了某个活动
   */
  createUserActivity: (req, res, next) => {
    var userId = req.query.userId;
        activityId = req.query.activityId;
    
    UserActivityModel.findOne({
      raw: true,
      where: {
        user_id: userId,
        act_id: activityId
      }
    }).then((item) => {
      if (item) {
        res.locals.returns = {
          code: '0000',
          data: null,
          message: "您已报名了哦  ~"
        }
        next()
      } else {
        UserActivityModel.create({
          user_id: userId,
          act_id: activityId
        }).then(userActivity => {
          res.locals.returns = {
            code: '0000',
            data: userActivity,
            message: "成功参加"
          }
          next()
        }).catch(err => {
          next(err)
        })
      }
    })

  },
  /**
   * @description 用户退出了某个活动
   */
  deleteUserActivity: (req, res, next) => {
    var id = req.query.id;
    sequelize.transaction(t => {
      UserActivityModel
        .destroy({
          where: {
            au_id: id
          }
        }, {
          transaction: t
        }).then()
    })
    .then(() => {
      res.locals.returns ={
        code: '0000',
        data: null,
        message: '删除成功'
      }
      next()
    }).catch(err => {
      next()
    })
  }
}
