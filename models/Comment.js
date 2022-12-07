const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    },
  comment: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);