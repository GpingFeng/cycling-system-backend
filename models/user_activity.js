/* jshint indent: 2 */

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
      type: DataTypes.STRING(200),
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
