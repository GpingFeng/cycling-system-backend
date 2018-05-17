/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_activity', {
    realname: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
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
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'user_activity',
    timestamps: false
  });
};
