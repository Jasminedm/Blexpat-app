const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const planController = require("../controllers/plan");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/personalT", ensureAuth, postsController.getMyTrips);
router.get("/showPost", ensureAuth, postsController.getShowPost);
router.get("/showPost/:id", ensureAuth, postsController.getShowPost);
router.put("/showP", ensureAuth, postsController.putItenerary);

router.get("/planTrip", ensureAuth, postsController.getPlanTrip);
router.get("/showPlan", ensureAuth, postsController.getShowPlan);
router.get("/showPlan/:id", ensureAuth, postsController.getShowPlan);
router.put("/showPlan/:id", ensureAuth, planController.updateList);

router.get("/feedPlan/:id", ensureAuth, postsController.getfeedPlan);


router.get("/explore", ensureAuth, postsController.getExplore);
router.get("/plan", ensureAuth, postsController.getPlan);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
