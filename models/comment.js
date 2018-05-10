/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    from_uid: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    username: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    content: {
      type: DataTypes.CHAR(200),
      allowNull: true
    },
    topic_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    topic_type: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    to_uid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    to_username: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'comment',
    timestamps: false
  });
};
