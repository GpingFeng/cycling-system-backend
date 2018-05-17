/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('association', {
    username: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
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
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    post_time: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'association',
    timestamps: false
  });
};
