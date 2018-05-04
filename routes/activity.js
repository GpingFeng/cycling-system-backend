/*
 * @description: 活动模块路由信息 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:27:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 17:26:07
 */
const express = require('express');
const router = express.Router();
const API = require('../config/api');
const activityModel = require('../controllers/activity');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get(API.GET_ACTIVITY_BY_ID, activityModel.getActivity);
router.get(API.GET_ALL_ACTIVITIES, activityModel.getAllActivity);
router.get(API.CREATE_ACTIVITY, activityModel.createActivity);

module.exports = router;