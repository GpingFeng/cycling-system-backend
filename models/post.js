/*
 * @description: 帖子表映射 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:25:14 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 09:17:44
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reply_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    content_text: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    images: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'post',
    timestamps: false
  });
};
