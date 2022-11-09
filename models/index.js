const User = require("./user");
const Post = require("./posts");
const Comment = require("./comment");

//links users to posts where users have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links posts to users where posts belong to users
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links users to comments where users have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links comments to users where comments belong to users
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links posts to comments where posts have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

//links comments to posts where comments belong to posts
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
module.exports = { User, Post, Comment };
