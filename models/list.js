const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  checkbox:{
  type: Boolean
  },
    text: {
        type: String
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
    
    module.exports = mongoose.model("List", ActivitySchema);

const IntenerarySchema = new mongoose.Schema({
  
    activities: {
        type:[ActivitySchema]
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
    
    module.exports = mongoose.model("Itenerary", IntenerarySchema);

    