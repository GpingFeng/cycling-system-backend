/*
 * @description: 评论模块控制器 
 * @Author: 冯光平 
 * @Date: 2018-05-10 11:07:02 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 20:17:31
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const commentModelFun = require('../models/comment');
const CommentModel = commentModelFun(sequelize, Sequelize);
const UserModelFun = require('../models/user');
const UserModel = UserModelFun(sequelize, Sequelize);

module.exports = {
  /**
   * 创建一条新的评论
   */
  createComment: function (req, res, next) {
    var from_uid = req.body.from_uid;
    var content = req.body.content;
    var topic_type = req.body.topic_type;
    var topic_id = req.body.topic_id;
    var to_uid = req.body.to_uid;

    var username
    var to_username
    // 查询用户
    UserModel.findOne({
      raw: true,
      where: {
        id: from_uid
      }
    }).then((user) => {
      // 如果存在回复人
      if (to_uid) {
        username = user.username
        UserModel.findOne({
          raw: true,
          where: {
            id: to_uid
          }
        }).then((user) => {
          to_username = user.username
          CommentModel.create({
            from_uid: from_uid,
            content: content,
            username: username,
            topic_id: topic_id,
            topic_type: topic_type,
            to_uid: to_uid,
            to_username: to_username
          }).then((comment) => {
            res.locals.returns = {
              code: '0000',
              data: comment,
              message: '评论成功'
            }
            next()
          })
        })
      } else {   // 没有存在回复人
        username = user.username
        CommentModel.create({
          from_uid: from_uid,
          content: content,
          username: username,
          topic_id: topic_id,
          topic_type: topic_type,
          to_uid: null,
          to_username: null
        }).then((comment) => {
          res.locals.returns = {
            code: '0000',
            data: comment,
            message: '评论成功'
          }
          next()
        })
      }
      
    })
  }
}