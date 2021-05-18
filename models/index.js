const Posts = require('./Posts');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Posts.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Posts, {
  foreignKey: 'posts_id'
})


module.exports = { User, Posts, Comment };

