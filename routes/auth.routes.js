const express = require("express");
const {
    registerUser,
    loginUser,
    getUserById,
} = require("../controllers/user.controller");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const Strategy = require("../utils/passport");
const sendResponse = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");

// http://localhost:8000/api/v1/user/register
passport.use(Strategy);

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get(
    "/login/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
// user/getUser
router.get("/getuser", (req, res, next) => {
    if (req.user) {
        return sendResponse(res, 201, "User Logged in Successfully", req.user);
    }
    return next(new CustomError("No User Logged in.", 400));
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(new CustomError("Error while logging out", 500));
        } else {
            return sendResponse(res, 200, "Logged Out Successfully");
        }
    });
});

router.get("/:userid", getUserById);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login?status=failed",
        successRedirect: "http://localhost:5173?success=true",
    })
);

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
