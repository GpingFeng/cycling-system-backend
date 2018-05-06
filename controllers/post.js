/*
 * @description: 帖子模块控制器，实现帖子模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 10:12:17
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const PostModelFunction = require('../models/post');
const PostModel = PostModelFunction(sequelize, Sequelize);

module.exports = {
  /**
   * @description 增加一个帖子
   */
  createPost: (req, res, next) => {
    var contentText = req.query.contentText,
        images = req.query.images,
        username = req.query.username;
        userId = req.query.userId;
    PostModel
      .create({
        content_text: contentText,
        images: images,
        username: username,
        user_id: userId
      }).then(post => {
        res.locals.returns = {
          code: '0000',
          data: post,
          message: '新增成功'
        }
        next();
      })
      .catch(err => {
        next(err);
      })
  },
  /**
   * @description 根据帖子Id查询某个帖子
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns
   */
  getPost: (req, res, next) => {
    console.log('come in');
    var postId = req.query.id;
    console.log('gpid:',postId);
    PostModel
      .findOne({where: {id: postId}})
      .then(post => {
        res.locals.returns = {
          code: '0000',
          data: post
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 对所有帖子进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getAllPosts: (req, res, next) => {
    PostModel.findAll({})
      .then(posts => {
        res.locals.returns ={
          code: '0000',
          data: posts
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 删除一个帖子
   */
  deletePost: (req, res, next) => {
    var postId = req.query.id;
    sequelize.transaction(t => {
      PostModel
        .destroy({
          where: {
            id: postId
          }
        }, {
          transaction: t
        }).then()
    }).then(() => {
      res.locals.returns = {
        code: '0000',
        data: 'null',
        message: '成功删除帖子'
      }
      next()
    }).catch(err => {
      next(err)
    }) 
  },
  /**
   * @description 查询该发表了哪些帖子
   */
  getPostsByUser: (req, res, next) => {
    var userId = req.query.userId;
    PostModel.findAll({
      where: {user_id: userId}
    })
      .then(posts => {
        res.locals.returns = {
          code: '0000',
          data: posts
        }
        next()
      })
      .catch(err => {
        next(err)
      })
  }
}