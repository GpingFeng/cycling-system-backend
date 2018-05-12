/*
 * @description: 车协模块控制器，实现车协模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 20:16:19
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const AssociationModelFunction = require('../models/association');
const AssociationModel = AssociationModelFunction(sequelize, Sequelize);
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);
const UserModelFun = require('../models/user');
const UserModel = UserModelFun(sequelize, Sequelize);
const moment = require('moment');

module.exports = {
  /**
   * @description 增加一个车协
   */
  createAssociation: (req, res, next) => {
    var nickname = req.body.nickname,
        fullname = req.body.fullname,
        intro = req.body.intro,
        uid = req.body.uid;
        nowTime = moment(Date.now()).format('MM-DD HH:mm:ss');
    UserModel.findOne({
      raw: true,
      where: {
        id: uid
      }
    }).then(user => {
      AssociationModel
      .create({
        nickname: nickname,
        fullname: fullname,
        intro: intro,
        username: user.username,
        user_id: user.id,
        avatar: user.avatar,
        post_time: nowTime
      }).then(association => {
        res.locals.returns = {
          code: '0000',
          data: association,
          message: '新增成功'
        }
        next();
      })
      .catch(err => {
        next(err);
      })
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
    var associationId = req.query.id;
    AssociationModel
      .findOne({
        raw: true,
        where: {id: associationId}
      })
      .then(association => {
        ImagesModel.findAll({
          raw: true,
          where: {
            target_id: associationId,
            target_type: 1
          }
        }).then((images) => {
          association.images = images;
          UserModel.findAll({
            raw: true,
            association_id: associationId
          }).then((users) => {
            association.users = users;
            res.locals.returns = {
              code: '0000',
              data: association
            }
            next();
          })
        })
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
    AssociationModel.findAll({
      raw: true
    })
      .then(associations => {
        var promiseAssociationArr = [];
        var associationsArr = [];
          associations.forEach(association => {
            promiseAssociationArr.push(
              ImagesModel.findAll({
                raw: true,
                where: {
                  target_id: association.id,
                  target_type: 1
                }
              }).then((images) => {
                association.images = images;
                associationsArr.push(association);
              })
            )
          })
        

        Promise.all(promiseAssociationArr)
          .then(() => {
            res.locals.returns ={
              code: '0000',
              data: associationsArr
            }
            next();
          })
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
      AssociationModel
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