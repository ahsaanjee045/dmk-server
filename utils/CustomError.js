class CustomError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.success = false
        Error.captureStackTrace(this, this.constructor)
    }
}


module.exports = CustomError

// let err = new CustomError("Some error message", 404)