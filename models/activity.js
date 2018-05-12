/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity', {
    is_important: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    content_text: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    reply_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    post_time: {
      type: DataTypes.STRING(20),
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
    title: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    like_uids: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    like_peaples: {
      type: DataTypes.INTEGER(40),
      allowNull: true
    }
  }, {
    tableName: 'activity',
    timestamps: false
  });
};
