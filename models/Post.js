const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  postImg: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  duration: {
        type: Date,
        default: Date.now,
  },
  budgetPaid: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  healthcare: {
    type: String,
    required: true,
  },
  allergy: {
    type: String,
    required: true,
  },
  attractions: {
    type: String,
    required: true,
  },
  transp: {
    type: String,
    required: true,
  },
  handicap: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  trouble:{
    type: String,
    required: true,
  },
  kidfriendly: {
    type: String,
    required: true,
  },
  petfriendly: {
    type: String,
    required: true,
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

module.exports = mongoose.model("myTrip", PostSchema);
