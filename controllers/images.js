/*
 * @description: 图片模块控制器 
 * @Author: 冯光平 
 * @Date: 2018-05-10 22:03:37 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-17 15:12:54
 */
const Sequelize = require('sequelize');
const util = require('util');
const sequelize = require('../db');
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);
const uuidv1 = require('uuid/v1');
var formidable = require("formidable");


module.exports = {
  /**
   * 上传一张图片
   */
  createImage: (req, res, next) => {
    // 创建一个form表单
    var form = new formidable.IncomingForm();
    var fs = require('fs');
    //临时目录
    form.uploadDir = './upload/';
    form.keepExtensions = true;
    // parse方法解析node.js中的request请求中的包含的form表单提交的数据
    form.parse(req, function(err, fields, files) {
      console.log(fields.target_id, fields.target_type);
      console.log(files.image.path);
      console.log(typeof(files.image.path))
      var target_id = fields.target_id,
          target_type = fields.target_type;
      var extName='.jpg';//后缀名
      switch(files.image.type) {
        case' image/pjpeg': extName='.jpg';
        break;
        case 'image/jpeg': extName='.jpg';
        break;
        case 'image/png': extName='.png';
        break;
        case 'image/x-png': extName='.png';
        break;
        case 'image/gif': extName='.gif';
        break;
      }

      if(extName.length == 0) {
        res.send('上传文件类型有误！');
        return;
      }

      const newPath = form.uploadDir + uuidv1() + extName;
      console.log(newPath)
      fs.renameSync(files.image.path, newPath);
      console.log(files.image.path);

      ImagesModel
      .create({
        target_id: target_id,
        target_type: target_type,
        address: 'http://localhost:3000/images/' + newPath
      }).then((image) => {
        res.locals.returns = {
          code: '0000',
          data: null,
          message: '上传成功'
        }
        next()
      })
      .catch((err) => {
        console.log('aaa++++++++++++++')
        next(err)
      })

    })

  }
}
