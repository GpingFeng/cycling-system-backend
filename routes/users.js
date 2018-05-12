/*
 * @description: 用户模块路由信息 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:28:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-12 13:44:22
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const UserController = require('../controllers/user');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(API.LOGIN, UserController.login);
router.post(API.UPDATE_USER, UserController.updateUser);
router.get(API.GET_ASSOCIATION_BY_USER, UserController.getAssociationByUser);
router.get(API.GETALLUSER, UserController.getAllUser);
router.get(API.GETUSERSBYASSOCIATION, UserController.getUsersByAssociation);
router.get(API.CREATE_USER, UserController.createUser);
router.get(API.DELETE_USER, UserController.deleteUser);
router.put(API.JOIN_ASSOCIATION, UserController.joinAssociation);

module.exports = router;