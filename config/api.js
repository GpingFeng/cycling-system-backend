/*
 * @description: 对API的配置 
 * @Author: 冯光平 
 * @Date: 2018-04-08 10:25:35 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-10 11:19:35
 */
const DEFAULT = '/mx-backend/api/';
// api版本号
const VERSION = 'v1';

// 前缀常量
const PREFIX = DEFAULT + VERSION;
const API = {
  // 创建一个新的用户
  CREATE_USER: '/create_user',
  // 根据id查询用户
  GETUSER: '/getuser',
  // 查询所有的用户
  GETALLUSER: '/getallusers',
  // 删除一个用户
  DELETE_USER: '/delete_user',
  // 查询用户加入了哪些车协
  GET_ASSOCIATION_BY_USER: '/get_association_by_user',
  // 查询用户发表了哪些帖子
  GET_POST_BY_USER: '/get_post_by_user',
  // 根据车协查询用户
  GETUSERSBYASSOCIATION: '/getusers_by_association',
  // 根据活动Id查询单个活动
  GET_ACTIVITY_BY_ID: '/get_activity_by_id',
  // 对所有的活动进行查询
  GET_ALL_ACTIVITIES: '/get_all_activities',
  // 新增一个活动
  CREATE_ACTIVITY: '/create_activity',
  // 删除一个活动
  DELETE_ACTIVITY: '/delete_activity',
  // 创建一个车协
  CREATE_ASSOCIATION: '/create_association',
  // 查询某个车协
  GET_ASSOCIATION_BY_ID: '/get_association_by_id',
  // 查询所有车协
  GET_ALL_ASSOCIATION: '/get_all_association',
  // 删除车协
  DELETE_ASSOCIATION: '/delete_association',
  // 车协中含有哪些用户
  GET_USERS_BY_ASSOCIATION: '/get_users_by_association',
  // 创建一个帖子
  CREATE_POST: '/create_post',
  // 删除某个帖子
  DELETE_POST: '/delete_post',
  // 对所有帖子的查询(按时间顺序排列)
  GET_ALL_POSTS: '/get_all_posts',
  // 某个帖子的详细信息
  GET_POST: '/get_post',
  // 查询用户参加了哪些活动
  GET_ACTIVITY_BY_USER: '/get_activity_by_user',
  // 该活动含有哪些用户
  GET_USERS_BY_ACTIVITY: '/get_users_by_activity',
  // 用户参加了一个活动
  CREATE_USER_ACTIVITY: '/create_user_activity',
  // 用户退出某个活动
  DELETE_USER_ACTIVITY: '/delete_user_activity',
  // 点赞
  LIKE: '/like',
  // 创建一条评论
  CREATE_COMMENT: '/create_comment'
}

module.exports = API;
