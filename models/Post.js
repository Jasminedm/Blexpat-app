const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  location: {
    type: String,
    
  },
  postImg: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  arrive: {
        type: Date,
        default: Date.now,
  },
  depart: {
    type: Date,
    default: Date.now,
},
  budgetPaid: {
    type: String,
    
  },
  exp: {
    type: String,
    
  },
  room: {
    type: String,
    
  },
  transp: {
    type: String,
    
  },
  handicap: {
    type: String,
    
  },
  trouble:{
    type: String,
    
  },
  kidfriendly: {
    type: String,
    
  },
  petfriendly: {
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

module.exports = mongoose.model("myTrip", PostSchema);
