/*
 * @description: 车协表映射 
 * @Author: 冯光平 
 * @Date: 2018-05-05 23:24:55 
 * @Last Modified by: 冯光平
 * @Last Modified time: 2018-05-06 09:17:12
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('association', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    intro: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'association',
    timestamps: false
  });
};
