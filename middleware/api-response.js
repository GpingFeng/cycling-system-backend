/*
 * @description: API返回值格式化模板方法
 * @Author: 冯光平 
 * @Date: 2018-05-04 10:01:53 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 10:02:51
 */
const RESPONSE_STATUS = require('../config/status');

/**
 * api返回值
 *
 * @param {Object} req code: 状态码 data: 返回数据
 * @param {Object} res
 * @returns {any}
 */
const apiResponse = (req, res, next) => {
  if (!res.locals.returns) {
    let code = '0100';
    res.json({
      code: code,
      error_message: RESPONSE_STATUS[code],
      data: null
    });
  } else {
    res.json(Object.assign(res.locals.returns, {
      message: res.locals.returns.message ? res.locals.returns.message : RESPONSE_STATUS[res.locals.returns.code],
      data: res.locals.returns.data || null
    }));
  }
};

module.exports = apiResponse;