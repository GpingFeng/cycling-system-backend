/*
 * @description: 用户模块控制器, 实现业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:20:39
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 15:16:49
 */
const sequelize = require('../db');
const Sequelize = require('sequelize');
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);
const UserModelFun = require('../models/user');
const UserModel = UserModelFun(sequelize, Sequelize);
const AssociationModelFunction = require('../models/association');
const AssociationModel = AssociationModelFunction(sequelize, Sequelize);

module.exports = {
  /**
   * 用户登录
   */
  login: (req, res, next) => {
    console.log('登录1', req.body.code);
    var code = req.body.code;
    var appSeclet = 'ea51f63f620058db1638226a5ff58fb6'
    var appId = 'wx1274fd6d32743f7f';
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+appSeclet+'&js_code='+code+'&grant_type=authorization_code';
    var request = require('request');
    request(url, function (err, response, body) {
      console.log(body);
      res.locals.returns = {
        code: '0000',
        data: body
      }
      next()
    })
  },
  /**
   * 更新用户接口
   */
  updateUser: (req, res, next) => {
    console.log(req.body);
    var id = req.body.id
        avatar = req.body.avatar,
        username = req.body.username;
    UserModel.find({
      where: {
        id: id
      }
    }).then(users => {
      // 如果不存在用户，则新增
      if (!users) {
        UserModel.create({
          id: id,
          username: username,
          avatar: avatar
        }).then((user) => {
          res.locals.returns = {
            code: '0000',
            data: user,
            message: '新增成功'
          }
          next()
        })
      } else {
        UserModel.update({
          username: username,
          avatar: avatar
        }, {
          where: {
            id: id
          }
        }).then((user) => {
          res.locals.returns = {
            code: '0000',
            data: user,
            message: '更新成功'
          }
          next()
        })
      }
    })

  },
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
   * 获取该用户加入了哪个车协
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns
   */
  getAssociationByUser: (req, res, next) => {
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
      .findOne({
        raw: true,
        where: {id: userId}
      })
      .then(user => {
        var associationId = user.association_id;
        res.locals.returns = {
          code: '0000',
          data: associationId
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
  },
  /**
   * 用户加入某个车协
   */
  joinAssociation: (req, res, next) => {
    var associationId = req.body.associationId,
        userId = req.body.userId;
    
    // 如果已经加入了一个车协，则不能再加
    UserModel.findOne({
      raw: true,
      where: {
        id: userId
      }
    }).then((userOne) => {
      console.log('我的：', userOne)
      if (userOne.association_id) {
        res.locals.returns = {
          code: '0000',
          data: null,
          message: '已有加入车协'
        }
        next()
      } else {
        AssociationModel.findOne({
          raw: true,
          where: {
            id: associationId
          }
        }).then((association) => {
          UserModel.update({
            association: association.nickname,
            association_id: associationId
          }, {
            where: {
              id: userId
            }
          }).then((user) => {
            res.locals.returns = {
              code: '0000',
              data: user,
              message: '加入成功'
            }
            next()
          })
        })
      }
    })

  }
};
