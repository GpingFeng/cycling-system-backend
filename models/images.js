/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    target_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    target_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'images',
    timestamps: false
  });
};
