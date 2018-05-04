/*
 * @description: 对API的配置 
 * @Author: 冯光平 
 * @Date: 2018-04-08 10:25:35 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 17:25:00
 */
const DEFAULT = '/mx-backend/api/';
// api版本号
const VERSION = 'v1';

// 前缀常量
const PREFIX = DEFAULT + VERSION;
const API = {
  // 用户api
  USER: '/user',
  // 根据id查询用户
  GETUSER: '/getuser',
  // 查询所有的用户
  GETALLUSER: '/getallusers',
  // 根据车协查询用户
  GETUSERSBYASSOCIATION: '/getusers_by_association',
  // 根据活动Id查询单个活动
  GET_ACTIVITY_BY_ID: '/get_activity_by_id',
  // 对所有的活动进行查询
  GET_ALL_ACTIVITIES: '/get_all_activities',
  // 新增一个活动
  CREATE_ACTIVITY: '/create_activity'
}

module.exports = API;
