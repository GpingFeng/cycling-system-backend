/*
 * @description: 用户活动关系路由 
 * @Author: 冯光平 
 * @Date: 2018-05-05 10:32:47 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 14:55:47
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const UserActivityController = require('../controllers/user_activity.js');

router.get('/', function(req, res, next) {
  res.send('respond with a resourceACtivity');
  next();
});
router.get(API.GET_ACTIVITY_BY_USER, UserActivityController.getActivityByUser);
router.get(API.GET_USERS_BY_ACTIVITY, UserActivityController.getUsersByactivity);
router.get(API.CREATE_USER_ACTIVITY, UserActivityController.createUserActivity);
router.get(API.DELETE_USER_ACTIVITY, UserActivityController.deleteUserActivity);

module.exports = router;