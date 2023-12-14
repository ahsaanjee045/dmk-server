const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Product Name is a required Field"],
            // minLength : [10, "Product Name must be at least 10 characters long."],
            // maxLength : [100, "Product Name must be at most 100 characters long."]
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            // minLength : [10, "Product Name must be at least 10 characters long."],
            // maxLength : [100, "Product Name must be at most 100 characters long."]
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        inStock: {
            type: Number,
            required: true,
        },
        overallRating: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                message: {
                    type: String,
                    trim: true,
                },
                userid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
            },
        ],
        discount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
