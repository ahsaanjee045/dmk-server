const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const Strategy = require("../utils/passport");

// http://localhost:8000/api/v1/user/register
passport.use(Strategy)


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login/google", passport.authenticate("google", {scope : ["profile", "email"]}));


router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect : "http://localhost:8000",
    successRedirect : "http://localhost:8000"
}))










passport.serializeUser(function (user, cb) {
    cb(null, { _id: user._id });
});

passport.deserializeUser(async function (session, cb) {
    try {
        
        let user = await User.findOne({ _id: session._id });
      
        if (user) {
            return cb(null, user);
        }
        cb(new Error("Can not find user"), null);
    } catch (error) {
        cb(error, null);
    }
});

module.exports = router;
