/*
 * @description: 活动模块控制器，实现活动模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 17:30:09
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');

const activityModelFunction = require('../models/activity');
const activityModel = activityModelFunction(sequelize, Sequelize);

module.exports = {
  createActivity: (req, res, next) => {
    var name = req.query.name,
        contentText = req.query.contentText,
        replyTime = req.query.replyTime,
        postTime = req.query.postTime;
    activityModel
      .create({
        name: name,
        content_text: contentText,
        reply_time: replyTime,
        post_time: postTime
      }).then(acticity => {
        res.locals.returns = {
          code: '0000',
          data: {
            name: acticity.name,
            content_text: acticity.content_text,
            reply_time: acticity.reply_time,
            post_time: acticity.post_time
          },
          message: '新增成功'
        }
        next()
      })
      .catch(err => {
        next(err);
      })
  },
  /**
   * @description 根据活动Id查询某个活动
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns
   */
  getActivity: (req, res, next) => {
    console.log('come in');
    var activityId = req.query.id;
    console.log('gpid:',activityId);
    activityModel
      .findOne({where: {id: activityId}})
      .then(activity => {
        res.locals.returns = {
          code: '0000',
          data: activity
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 对所有活动进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getAllActivity: (req, res, next) => {
    activityModel.findAll({})
      .then(activities => {
        res.locals.returns ={
          code: '0000',
          data: activities
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  }
}