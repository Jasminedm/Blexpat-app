const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  itenerary:{
    type: [String],
    default: [],
  },
  location: {
    type: String,
    require: true,
  },
  postImg: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  depart: {
    type: Date,
    default: Date.now,
},
  arrive: {
        type: Date,
        default: Date.now,
  },
  budgetPaid: {
    type: String,
    
  },
  personalnote: {
    type: String,
    require: true,
  },
  room: {
    type: String,
    
  },
  healthcare: {
    type: String,
    
  },
  allergy: {
    type: String,
    
  },
  transp: {
    type: String,
    
  },
  handicap: {
    type: String,
    
  },
  shop: {
    type: String,
    
  },
  help:{
    type: String,
    require: true,
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

module.exports = mongoose.model("Plan", PostSchema);