/*
 * @description: 用户模块控制器, 实现业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:20:39
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 17:14:57
 */
const UserModel = require('../models/user');
const db = require('../db');

module.exports = {
  /**
   * 获取单个用户
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns
   */
  getUser: (req, res, next) => {
    console.log('Gp:获取单个用户');
    let username = req.query.username;
    // 如果没有传用户名
    if (!username) {
      res.locals.returns = {
        code: '0002',
        data: {
          msg: '没有传用户名'
        }
      }
      next();
    }

    UserModel
      .findOne({where: {username: username}})
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
  }
};
