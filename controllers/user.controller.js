const User = require("../models/user.model");
const sendResponse = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


const registerUser = asyncErrorHandler(async (req, res, next) => {
    let { username, email, password, role } = req.body;

    if (
        !username ||
        !username.trim() ||
        !email ||
        !email.trim() ||
        !password ||
        !password.trim()
    ) {
        return next(
            new CustomError("Username, email or password is missing.", 400)
        );
    }
    let user = await User.findOne({
        $or: [
            { username: { $regex: username, $options: "i" } },
            { email: { $regex: email, $options: "i" } },
        ],
    });

    if (user) {
        return next(new CustomError("User Already Registered", 400));
    }

    user = await new User({
        username,
        email,
        password,
        role: role ? role : "user",
    }).save();

    user = user.toObject();
    delete user.password;

    return sendResponse(res, 201, "User Registered", user);
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
    let { email, password } = req.body;
    if (!email || !email.trim() || !password || !password.trim()) {
        return next(new CustomError("Email or password is missing.", 400));
    }

    let user = await User.findOne({
        email: { $regex: email, $options: "i" },
    }).select("+password");

    if (!user) {
        return next(new CustomError("User Does not Exists in Database.", 400));
    }

    let result = await user.checkPassword(password);

    if (!result) {
        return next(new CustomError("Invalid Credential", 400));
    }

    let token = user.generateToken();

    user = user.toObject();
    delete user.password;
    return sendResponse(res, 200, "User Logged In Successfully", user, {
        token: token,
    });
});

const getUserById = asyncErrorHandler(async (req, res, next) => {
    let userid = req.params.userid;

    let user = await User.findById(userid);

    return sendResponse(res, 200, "User Found Successfully", user);
});


module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.getUserById = getUserById;
