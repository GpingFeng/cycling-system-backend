/*
 * @description: 评论模块控制器 
 * @Author: 冯光平 
 * @Date: 2018-05-10 11:07:02 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-10 20:14:06
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const commentModelFun = require('../models/comment');
const CommentModel = commentModelFun(sequelize, Sequelize);
const UserModel = require('../models/user');

module.exports = {
  /**
   * 创建一条新的帖子
   */
  createComment: function (req, res, next) {
    var from_uid = req.query.from_uid;
    var content = req.query.content;
    var topic_type = req.query.topic_type;
    var topic_id = req.query.topic_id;
    var to_uid = req.query.to_uid;
    var username
    var to_username
    // 查询用户
    UserModel.findOne({
      raw: true,
      where: {
        id: from_uid
      }
    }).then((user) => {
      console.log(to_uid)
      if (to_uid) {
        username = user.username
        UserModel.findOne({
          raw: true,
          where: {
            id: to_uid
          }
        }).then((user) => {
          console.log(user)
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
      } else {
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