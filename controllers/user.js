/*
 * @description: 用户模块控制器, 实现业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:20:39
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-08 18:18:53
 */
const UserModel = require('../models/user');
const sequelize = require('../db');
const Sequelize = require('sequelize');
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);

module.exports = {
  /**
   * @description 增加一个新的用户
   */
  createUser: (req, res, next) => {
    var name = req.query.username,
        avatar = req.query.avatar,
        association = req.query.association;
        console.log('createUserGp');
    UserModel
      .create({
        username: name,
        avatar: avatar,
        association: association
      }).then(user => {
        res.locals.returns = {
          code: '0000',
          data: {
            username: user.username,
            avatar: user.avatar,
            association: user.association
          },
          message: '新增成功'
        }
        next()
      }).catch(err => {
        next(err)
      })
  },
  /**
   * 获取单个用户，查询该用户加入了那个车协
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns
   */
  getUser: (req, res, next) => {
    console.log('Gp:获取单个用户');
    let userId = req.query.userId;
    // 如果没有传用户名
    if (!userId) {
      res.locals.returns = {
        code: '0002',
        data: {
          msg: '没有传用户名'
        }
      }
      next();
    }

    UserModel
      .findOne({where: {id: userId}})
      .then(user => {
        res.locals.returns = {
          code: '0000',
          data: user
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 对所有用户进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getAllUser: (req, res, next) => {
    console.log('gp：查询所有用户');
    UserModel.findAll({}
    ).then(users => {
      res.locals.returns = {
        code: '0000',
        data: users
      }
      next();
    })
    .catch(err => {
      next(err)
    })
  },
  /**
   * @desc 根据车协对用户进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getUsersByAssociation: (req, res, next) => {
    var associationReq = req.query.association;
    UserModel.findAll({
      where: {
        association: associationReq
      }
    }).then(users => {
      res.locals.returns = {
        code: '0000',
        data: users
      }
      next();
    })
    .catch(err => {
      next(err);
    });
  },
  /**
   * @description 删除一个用户
   */
  deleteUser: (req, res, next) => {
    var userId = req.query.id;
    sequelize.transaction(t => {
      UserModel
        .destroy({ 
          where: {
            id: userId
          }
        }, {
          transaction: t
        }).then()
    })
    .then(() => {
      res.locals.returns = {
        code: '0000',
        data: null,
        message: '删除成功'
      }
      next()
    })
  }
};
