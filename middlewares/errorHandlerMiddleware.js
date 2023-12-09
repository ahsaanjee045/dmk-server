module.exports = (err, req, res, next) => {
    if (err.name === "CastError") {
        err.message = `Invalid Value for ${err.path} : ${err.value}`;
    } else if (err.name === "ValidationError") {
        err.message = Object.values(err.errors)
            .map((e) => e.message)
            .join(". ");
    } else if (err.code === 11000) {
       
        err.message = `Duplicate data : ${Object.keys(err.keyValue)[0]}`;
    }
     else if (err.name === "JsonWebTokenError") {
        
        err.message = `Invalid Token`;
    }

    if (process.env.NODE_ENV === "production") {
        res.status(err.statusCode || 500).json({
            success: err.success || "false",
            message: err.message || "Something went wrong",
        });
    } else if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode || 500).json({
            success: err.success || "false",
            message: err.message || "Something went wrong",
            stack: err.stack,
            error: err,
        });
    }
};
