/*
 * @description: 图片模块控制器 
 * @Author: 冯光平 
 * @Date: 2018-05-10 22:03:37 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 20:17:44
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);

module.exports = {
  /**
   * 上传一张图片
   */
  createImage: (req, res, next) => {
    res.locals.returns = {
      code: '0000',
      data: '哈哈哈'
    }
    next()
  }
}
