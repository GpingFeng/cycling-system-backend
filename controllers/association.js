/*
 * @description: 车协模块控制器，实现车协模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 09:07:54
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const associationModelFunction = require('../models/association');
const associationModel = associationModelFunction(sequelize, Sequelize);

module.exports = {
  /**
   * @description 增加一个车协
   */
  createAssociation: (req, res, next) => {
    var nickname = req.query.nickname,
        fullname = req.query.fullname,
        intro = req.query.intro;
    associationModel
      .create({
        nickname: nickname,
        fullname: fullname,
        intro: intro
      }).then(association => {
        res.locals.returns = {
          code: '0000',
          data: {
            nickname: association.nickname,
            fullname: association.fullname,
            intro: association.intro
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
   * @description 根据车协Id查询某个车协
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns
   */
  getAssociation: (req, res, next) => {
    console.log('come in');
    var associationId = req.query.id;
    console.log('gpid:',associationId);
    associationModel
      .findOne({where: {id: associationId}})
      .then(association => {
        res.locals.returns = {
          code: '0000',
          data: association
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 对所有车协进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getAllAssociation: (req, res, next) => {
    associationModel.findAll({})
      .then(associations => {
        res.locals.returns ={
          code: '0000',
          data: associations
        }
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 删除一个车协
   */
  deleteAssociation: (req, res, next) => {
    var associationId = req.query.id;
    sequelize.transaction(t => {
      associationModel
        .destroy({
          where: {
            id: associationId
          }
        }, {
          transaction: t
        }).then()
    }).then(() => {
      res.locals.returns = {
        code: '0000',
        data: 'null',
        message: '成功删除车协'
      }
      next()
    }).catch(err => {
      next(err)
    })
  }
}