const User = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

let Strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/v1/user/auth/google/callback",
    },
    async function (_, _, profile, callback) {
        try {
            let user = await User.findOne({ email: profile._json.email });
            if (user) {
                return callback(null, user);
            }

            user = await new User({
                username: profile._json.name,
                email: profile._json.email,
                provider: profile.provider,
                password: "password",
            }).save();

            if (!user) {
                callback(new Error("Cann't find user"), null);
            }
            callback(null, user);
        } catch (error) {
            callback(error, null);
        }
    }
);

module.exports = Strategy;
