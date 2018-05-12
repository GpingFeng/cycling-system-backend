/*
 * @description: 评论模块路由信息 
 * @Author: 冯光平 
 * @Date: 2018-04-16 10:28:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-11 17:15:47
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const CommentController = require('../controllers/comment');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(API.CREATE_COMMENT, CommentController.createComment);


module.exports = router;