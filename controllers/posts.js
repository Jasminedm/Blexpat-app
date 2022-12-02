const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Plan = require("../models/Plan");




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
      const id = await Plan.findById(req.params.id)
      const plan = await Plan.find({ user: req.user.id });
      res.render("feed.ejs", { plan: plan, user: req.user, id: id});
    } catch (err) {
      console.log(err);
    }
  },
  getfeedPlan: async (req, res) => {
    try {
      
      const plan = await Plan.findById(req.params.id);
      const comment = await Comment.find().sort({ createdAt: "desc" }).lean();;
      res.render("feedPlan.ejs", { plan: plan, user: req.user, comment: comment});
    } catch (err) {
      console.log(err);
    }
  },
  getMyTrips: async (req, res) => {
    console.log(req.body)
    try {
      
      
      const id = await Post.findById(req.params.id)
      const post = await Post.find({ user: req.user.id });
      
      
      res.render("personalT.ejs", { post: post, user: req.user, id: id });
    } catch (err) {
      console.log(err);
    }
  },
  getPlanTrip: async (req, res) => {
    try {
      const id = await Plan.findById(req.params.id)
      const plan = await Plan.find({ user: req.user.id });
      res.render("planTrip.ejs", { plan: plan, user: req.user, id: id});
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
  getShowPlan: async (req, res) => {
    try {
      
      const plan = await Plan.findById(req.params.id);
      
      res.render("showPlan.ejs", { plan: plan, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  putItenerary: async (req, res) => {
    try {
      const updateIten = await Plan.findByIdAndUpdate(req.body.id, {itenerary: req.body.itenerary})
      console.log("heyyy", req.body.itenerary, req.body.id)
      res.redirect(`/showPlan/${req.body.id}`);
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
  // getPopPlan: async (req, res) => {
  //   try {
  //     const plan = await Plan.findById(req.params.id);
      
  //     res.render("planTrip.ejs", { plan: plan, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id});
      res.render("post.ejs", { post: post, user: req.user, comment: comment});
    } catch (err) {
      console.log(err);
    }
  },
  // getPopPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
      
  //     res.render("personalT.ejs", { post: post, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getShowPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      res.render("showPlan.ejs", { post: post, user: req.user});
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
        transp: req.body.transp,
        handicap: req.body.handicap,
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
