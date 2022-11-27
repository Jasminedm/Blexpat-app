const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts});
    } catch (err) {
      console.log(err);
    }
  },
  getMyTrips: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("personalT.ejs", { posts: posts});
    } catch (err) {
      console.log(err);
    }
  },
  getPlanTrip: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("planTrip.ejs", { posts: posts});
    } catch (err) {
      console.log(err);
    }
  },
  getExplore: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("explore.ejs", { posts: posts});
    } catch (err) {
      console.log(err);
    }
  },
  getPlan: async (req, res) => {
    try {
      
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("plan.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id});
      res.render("post.ejs", { post: post, user: req.user, comment: comment});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); 

      await Post.create({
        location: req.body.location,
        postImg: result.secure_url,
        cloudinaryId: result.public_id,
        duration: req.body.duration,
        budgetPaid: req.body.budgetPaid,
        exp: req.body.exp,
        room: req.body.room,
        healthcare: req.body.healthcare,
        allergy: req.body.allergy,
        attractions: req.body.attractions,
        transp: req.body.transp,
        handicap: req.body.handicap,
        shop: req.body.shop,
        trouble: req.body.trouble,
        kidfriendly: req.body.kidfriendly,
        petfriendly: req.body.petfriendly,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/personalT");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
