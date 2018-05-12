/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    username: {
      type: DataTypes.CHAR(40),
      allowNull: false
    },
    association: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    association_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
