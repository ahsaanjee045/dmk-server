require("dotenv").config();
const express = require("express");
const colors = require("colors");
const connectDB = require("./db/db.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const authRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");
const CustomError = require("./utils/CustomError.js");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware.js");
const categoryRoutes = require("./routes/category.routes.js");

const store = new MongoStore({
    mongoUrl: process.env.MONGO_URI_SESSION,
});

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);

app.all("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running!",
    });
});

app.all("*", (req, res, next) => {
    let err = new CustomError(
        `The path you are looking for could not be found : ${req.path}`,
        400
    );
    next(err);
});

app.use(errorHandlerMiddleware);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(
        `Server is listening on PORT ${process.env.PORT}`.red.underline
    );
});

process.on("unhandledRejection", (err) => {
    console.log(err.message);
    console.log(
        "Shutting down the server due to an unhandled Exception/Rejection"
    );
    process.exit(1);
});
