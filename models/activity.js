/*
 * @description:  活动模块数据模型
 * @Author: 冯光平 
 * @Date: 2018-05-04 15:13:04 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-04 16:39:15
 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    content_text: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    reply_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    post_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    images: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    tableName: 'activity',
    timestamps: false
  });
};
