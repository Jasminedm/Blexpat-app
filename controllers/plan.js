const cloudinary = require("../middleware/cloudinary");
const Plan = require("../models/Plan");
const Comment = require("../models/Comment");
const List = require("../models/list");

module.exports = {

createPlan: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); 

      await Plan.create({
        location: req.body.location,
        postImg: result.secure_url,
        cloudinaryId: result.public_id,
        arrive: req.body.arrive,
        depart: req.body.depart,
        budgetPaid: req.body.budgetPaid,
        personalnote: req.body.exp,
        room: req.body.room,
        healthcare: req.body.healthcare,
        allergy: req.body.allergy,
        transp: req.body.transp,
        handicap: req.body.handicap,
        shop: req.body.shop,
        help: req.body.help,
        kidfriendly: req.body.kidfriendly,
        petfriendly: req.body.petfriendly,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/planTrip");
    } catch (err) {
      console.log(err);
    }
  },

  //save this list
  updateList: async (req, res) => {
    try {
      const update = req.body.itenerary;
      const plan = await List.findOneAndUpdate(req.params.id, update);
       
      
      console.log("Post has been added!");
      
    } catch (err) {
      console.log(err);
    }
  },
}

