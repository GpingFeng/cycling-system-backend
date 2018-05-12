/*
 * @description: 活动模块控制器，实现活动模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 20:14:48
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const ActivityModelFunction = require('../models/activity');
const ActivityModel = ActivityModelFunction(sequelize, Sequelize);
const commentModelFun = require('../models/comment');
const CommentModel = commentModelFun(sequelize, Sequelize);

module.exports = {
  /**
   * @description 增加一个活动
   */
  createActivity: (req, res, next) => {
    var name = req.query.name,
        contentText = req.query.contentText,
        replyTime = req.query.replyTime,
        postTime = req.query.postTime;
    ActivityModel
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
        next();
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
    var activityId = req.query.id;
    ActivityModel
      .findOne({
        raw: true,
        where: { id: activityId }
      })
      .then(activity => {
        CommentModel.findAll({
          raw: true,
          where: {
            topic_id: activity.id,
            topic_type: 1
          }
        }).then((comments => {
          // postTemp.comments = comments;
          activity.comments = comments;
          res.locals.returns = {
            code: '0000',
            data: activity
          }
          next();
        }))
        
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
    ActivityModel.findAll({})
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
  },
  /**
   * @description 删除一个活动
   */
  deleteActivity: (req, res, next) => {
    var acticityId = req.query.id;
    sequelize.transaction(t => {
      ActivityModel
        .destroy({
          where: {
            id: acticityId
          }
        }, {
          transaction: t
        }).then()
    }).then(() => {
      res.locals.returns = {
        code: '0000',
        data: 'null',
        message: '成功删除活动'
      }
      next()
    }).catch(err => {
      next(err)
    })
  }
}