/*
 * @description: 帖子模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:34:31 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-11 17:29:18
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
router.put(API.CREATE_POST, PostController.createPost);
router.get(API.DELETE_POST, PostController.deletePost);
router.get(API.GET_POST_BY_USER, PostController.getPostsByUser);
router.post(API.LIKE, PostController.like);

module.exports = router;