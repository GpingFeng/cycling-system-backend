/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    like_uids: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    like_peaples: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reply_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    content_text: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'post',
    timestamps: false
  });
};
