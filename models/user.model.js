const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Username is a required Field"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Email is a required Field"],
            unique: true,
            // validate: {
            //     validator: function(v) {
            //       return /\d{3}-\d{3}-\d{4}/.test(v);
            //     },
            //     message: props => `${props.value} is not a valid Email!`
            //   },
        },
        password: {
            type: String,
            required: [true, "Password is a required Field"],
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        provider: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
        return;
    }
    this.password = await bcryptjs.hash(this.password, 10);

    next();
});

userSchema.methods.checkPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
