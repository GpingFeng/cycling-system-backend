/*
 * @description: 帖子模块控制器，实现帖子模块业务逻辑 
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:19:22 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-17 08:56:46
 */
const Sequelize = require('sequelize');
const sequelize = require('../db');
const PostModelFunction = require('../models/post');
const PostModel = PostModelFunction(sequelize, Sequelize);
const imagesModelFun = require('../models/images');
const ImagesModel = imagesModelFun(sequelize, Sequelize);
const activityModelFun = require('../models/activity');
const ActivityModel = activityModelFun(sequelize, Sequelize);
const commentModelFun = require('../models/comment');
const CommentModel = commentModelFun(sequelize, Sequelize);
const UserModelFun = require('../models/user');
const UserModel = UserModelFun(sequelize, Sequelize);
const moment = require('moment');

module.exports = {
  /**
   * @description 增加一个帖子
   */
  createPost: (req, res, next) => {
    var contentText = req.body.content_text,
        userId = req.body.uid
        nowTime = moment(Date.now()).format('MM-DD HH:mm:ss');

    UserModel.findOne({
      raw: true,
      where: {
        id: userId
      }
    }).then((user) => {
      var avatar = user.avatar;
      var username = user.username;
      PostModel
        .create({
          content_text: contentText,
          username: username,
          user_id: userId,
          avatar: avatar,
          post_time: nowTime,
          like_peaples: 0
        }).then(post => {
          res.locals.returns = {
            code: '0000',
            data: post,
            message: '新增成功'
          }
          next();
        })
        .catch(err => {
          next(err);
        })
    })
  },
  /**
   * @description 根据帖子Id查询某个帖子
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns
   */
  getPost: (req, res, next) => {
    var postId = req.query.id;

    PostModel
      .findOne({
        raw: true,
        where: {id: postId}
      })
      .then(post => {
        var promisePostArr = [];
        var postTemp = {};
        promisePostArr.push(
          // 查询到该帖子有哪些图片
          ImagesModel.findAll({
            raw: true,
            where: {
              target_id: post.id,
              target_type: 0
            }
          }).then((images) => {
              post.images = images;
            })
        )

        promisePostArr.push(
          // 查询到该帖子有哪些评论
          CommentModel.findAll({
            raw: true,
            where: {
              topic_id: post.id,
              topic_type: 0
            }
          }).then((comments => {
            post.comments = comments;
          }))
        )

        Promise.all(promisePostArr)
          .then(() => {
            res.locals.returns = {
              code: '0000',
              data: post
            }
            next();
          })
      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 对所有帖子进行查询
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns 
   */
  getAllPosts: (req, res, next) => {
    // 获得所有帖子
    PostModel.findAll({
      order: [["post_time","DESC"]],
      raw: true
    }).then(posts => {
        console.log('所有帖子')
        var postsArr = [];
        var promisePostArr = [];
        var importantActivities = [];

        // 查询每条帖子所包含的图片和每条帖子包含的评论
        posts.forEach(post => {
          var postTemp = {};
          promisePostArr.push(
            // 帖子的评论
            ImagesModel.findAll({
              where: {
                target_id: post.id,
                target_type: 0
              }
            }).then((images) => {
              postTemp = Object.assign({}, post, {
                images: images
              });
            })
          )

          // 帖子的评论
          promisePostArr.push(
            CommentModel.findAll({
              where: {
                topic_id: post.id,
                topic_type: 0
              }
            }).then((comments => {
              console.log('评论');
              postTemp.comments = comments;
              postsArr.push(postTemp);
            }))
          )

        });
        
        // 查询重要活动（轮播图部分）
        promisePostArr.push(
          ActivityModel.findAll({
            where: {
              is_important: 1
            }
          }).then((activities) => {
            importantActivities = activities;
          })
        )

        Promise.all(promisePostArr)
          .then(() => {
            res.locals.returns = {
              code: '0000',
              data: {
                activities: importantActivities,
                posts: postsArr
              },
              message: '获取所有帖子成功'
            }
            next();
          })

      })
      .catch(err => {
        next(err);
      });
  },
  /**
   * @description 删除一个帖子
   */
  deletePost: (req, res, next) => {
    var postId = req.query.id;
    sequelize.transaction(t => {
      PostModel
        .destroy({
          where: {
            id: postId
          }
        }, {
          transaction: t
        }).then()
    }).then(() => {
      res.locals.returns = {
        code: '0000',
        data: 'null',
        message: '成功删除帖子'
      }
      next()
    }).catch(err => {
      next(err)
    })
  },
  /**
   * @description 查询该用户发表了哪些帖子
   */
  getPostsByUser: (req, res, next) => {
    var userId = req.query.userId;
    PostModel.findAll({
      where: {user_id: userId}
    })
      .then(posts => {
        res.locals.returns = {
          code: '0000',
          data: posts
        }
        next()
      })
      .catch(err => {
        next(err)
      })
  },
  /**
   * @description 点赞接口
   */
  like: (req, res, next) => {
    var id = req.body.id,
        type = req.body.type,
        uid = req.body.uid;

    // 0为帖子点赞，1为活动文章点赞
    if (type == 0) {
      PostModel.findOne({
        raw: true,
        where: {
          id: id
        }
      }).then((post) => {
        var isLike = true;
        var likeUidArr = [];
        if (post.like_uids) {
          likeUidArr = post.like_uids.split(',');
        }
        
        var deleteTargetIndex
        likeUidArr.forEach((id, index) => {
          // 已点赞过的
          if (id == uid) {
            isLike = false
            deleteTargetIndex = index
          }
        })
        if (isLike) {
          // 自增一
          post.like_peaples++;
          likeUidArr.push(uid);
        } else {
          // 自减
          post.like_peaples--;
          likeUidArr.splice(deleteTargetIndex, 1);
        }

        var likeUidStr = likeUidArr.join(',');
        post.like_uids = likeUidStr;
        
        PostModel.update({
          like_peaples: post.like_peaples,
          like_uids: likeUidStr
        }, {
          where: {
            id: id
          }
        }).then((lastPost) => {
          res.locals.returns = {
            code: '0000',
            data: post
          }
          next();
        })
      })
    } else {
      // 为活动点赞
      ActivityModel.findOne({
        raw: true,
        where: {
          id: id
        }
      }).then((activity) => {
        var isLike = true;
        var likeUidArr = [];
        if (activity.like_uids) {
          likeUidArr = activity.like_uids.split(',');
        }
        
        var deleteTargetIndex
        likeUidArr.forEach((id, index) => {
          // 已点赞过的
          if (id == uid) {
            isLike = false
            deleteTargetIndex = index
          }
        })
        if (isLike) {
          // 自增一
          activity.like_peaples++;
          likeUidArr.push(uid);
        } else {
          // 自减
          activity.like_peaples--;
          likeUidArr.splice(deleteTargetIndex, 1);
        }

        var likeUidStr = likeUidArr.join(',');
        activity.like_uids = likeUidStr;
        
        ActivityModel.update({
          like_peaples: activity.like_peaples,
          like_uids: likeUidStr
        }, {
          where: {
            id: id
          }
        }).then((lastPost) => {
          res.locals.returns = {
            code: '0000',
            data: activity
          }
          next();
        })
      })
    }
  }
}