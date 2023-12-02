const User = require("../models/user.model");
// const bcryptjs = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        // get the data from the request body - {username, email, password, role}
        // validate the data
        // find the user with the provided email and username
        // if the user exists then throw an error - "User already exists"
        // else hash the password and save the details in database
        let { username, email, password, role } = req.body;

        if (
            !username ||
            !username.trim() ||
            !email ||
            !email.trim() ||
            !password ||
            !password.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Username, email or password is missing.",
            });
        }

        // "ABC" !== "abc"
        let user = await User.findOne({
            $or: [
                { username: { $regex: username, $options: "i" } },
                { email: { $regex: email, $options: "i" } },
            ],
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists in Database.",
            });
        }

        user = await new User({
            username,
            email,
            password,
            role: role ? role : "user",
        }).save();

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !email.trim() || !password || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email or password is missing.",
            });
        }

        let user = await User.findOne({
            email: { $regex: email, $options: "i" },
        }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Does not Exists in Database.",
            });
        }

        let result = await user.checkPassword(password);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials. Please try again.",
            });
        }

        let token = user.generateToken();

        user = user.toObject();
        delete user.password;
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// module.exports = {
//     registerUser,
// };
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
