/*
 * @description: 用户活动映射表 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:26:16 
 * @Last Modified by:   冯光平 
 * @Last Modified time: 2018-05-05 23:26:16 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_activity', {
    act_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'activity',
        key: 'id'
      }
    },
    au_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_activity',
    timestamps: false
  });
};
