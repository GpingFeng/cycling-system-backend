/*
 * @description: 用户模块路由信息 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:28:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 11:02:33
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const UserController = require('../controllers/user');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get(API.GETUSER, UserController.getUser);
router.get(API.GETALLUSER, UserController.getAllUser);
router.get(API.GETUSERSBYASSOCIATION, UserController.getUsersByAssociation);

module.exports = router;