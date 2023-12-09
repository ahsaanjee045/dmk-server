const User = require("../models/user.model");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");

const verifyUser = asyncErrorHandler(async (req, res, next) => {
    let user = req.user;

    if (user) {
        return next();
    }

    let header = req.headers.authorization;
    if (!header) {
        return next(new CustomError("No Authorization header provided", 401));
    }
    // Bearer
    let token = header.split(" ")[1];
    if (!token) {
        return next(new CustomError("No Token provided", 401));
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    user = await User.findById(decoded._id);

    if (!user) {
        return next(new CustomError("No user found with that token", 401));
    }

    req.user = user;

    next();

    // if()
});

const verifyAdmin = asyncErrorHandler(async (req, res, next) => {

    if (req.user.role !== "admin") {
        return next(new CustomError("You are not an admin.", 403));
    }
    return next();
});

module.exports.verifyUser = verifyUser;
module.exports.verifyAdmin = verifyAdmin;
