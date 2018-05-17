/*
 * @description: 图片模块路由 
 * @Author: 冯光平 
 * @Date: 2018-05-10 22:06:10 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-16 22:36:08
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
const API = require('../config/api');
const ImagesController = require('../controllers/images');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(API.CREATE_IMAGE, ImagesController.createImage);
router.get('/upload/:imageid', (req, res, next) => {
  var imageid = req.params.imageid;
  console.log(imageid);
  // var path = 'localhost:3000' + imageid;
  // fs.readFile('/upload/690.jpeg', (err, content) => {
  //   res.contentType('image/jpeg');
  //   res.end(content, 'binary');
  // });
  // res.contentType('image/jpeg');
  // res.end('/upload/690.jpeg', 'binary');
  // res.sendFile(path.resolve('./') + '/upload/' + imageid);
  res.sendFile(process.cwd() + '/upload/' + imageid);
});

module.exports = router;
