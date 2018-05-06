/*
 * @description: 车协模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:27:42 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 09:15:52
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const AssociationController = require('../controllers/association');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get(API.GET_ASSOCIATION_BY_ID, AssociationController.getAssociation);
router.get(API.GET_ALL_ASSOCIATION, AssociationController.getAllAssociation);
// router.get(API.GET_USERS_BY_ASSOCIATION, AssociationController.getUsersByAssociation);
router.get(API.CREATE_ASSOCIATION, AssociationController.createAssociation);
router.get(API.DELETE_ASSOCIATION, AssociationController.deleteAssociation);

module.exports = router;