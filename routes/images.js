/*
 * @description: 图片模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-10 22:06:10 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-11 08:06:26
 */
/*
 * @description: 帖子模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:34:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-09 16:07:58
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const ImagesController = require('../controllers/images');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(API.CREATE_IMAGE, ImagesController.createImage);

module.exports = router;
