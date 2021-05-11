const Posts = require('./Posts');
const User = require('./User');

User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Posts };

