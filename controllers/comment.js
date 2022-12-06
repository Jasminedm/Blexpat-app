const ObjectId = require("mongodb").ObjectId;
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  
    createComment: async (req, res) => {
      let user = await User.findById({ _id: ObjectId(req.user.id) });
      console.log()
    try {
        console.log(req.body)
        console.log(req.params.id)
      await Comment.create({
        post: req.params.id,
        comment: req.body.comment,
        user: req.user.id,
        userName: user.userName
      });
      console.log("Comment has been added!");
      res.redirect(`/feedPlan/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feedPlan");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};