const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            trim: true,
            required: true,
            unique : true,
            minLength: [3, "Category name must be at least 3 characters long"],
            maxLength: [50, "Category name must be at most 50 characters long"],
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
