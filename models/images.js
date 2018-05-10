/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    target_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    target_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'images',
    timestamps: false
  });
};
