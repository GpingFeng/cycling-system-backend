/*
 * @description: 帖子模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:34:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 10:13:48
 */
var express = require('express');
var router = express.Router();
const API = require('../config/api');
const PostController = require('../controllers/post');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get(API.GET_POST, PostController.getPost);
router.get(API.GET_ALL_POSTS, PostController.getAllPosts);
router.get(API.CREATE_POST, PostController.createPost);
router.get(API.DELETE_POST, PostController.deletePost);
router.get(API.GET_POST_BY_USER, PostController.getPostsByUser)

module.exports = router;