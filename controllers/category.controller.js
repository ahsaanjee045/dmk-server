const Category = require("../models/category.model");
const sendResponse = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createCategory = asyncErrorHandler(async (req, res, next) => {
    let categoryName = req.body.categoryName;

    let newCategory = await new Category({
        categoryName,
    }).save();

    return sendResponse(res, 201, "Category created successfully", newCategory);
});

const getAllCategory = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find();
    return sendResponse(
        res,
        200,
        "All Categories fetched successfully",
        categories
    );
});

const updateCategory = asyncErrorHandler(async (req, res, next) => {
    let categoryid = req.params.categoryid;
    let categoryName = req.body.categoryName;

    let updatedCategory = await Category.findByIdAndUpdate(
        categoryid,
        {
            $set: {
                categoryName,
            },
        },
        { new: true }
    );

    if (!updatedCategory) {
        return next(
            new CustomError(
                `Category with id ${categoryid} cannot be updated`,
                404
            )
        );
    }

    return sendResponse(
        res,
        200,
        "Category updated successfully",
        updatedCategory
    );
});
const deleteCategory = asyncErrorHandler(async (req, res, next) => {
    let categoryid = req.params.categoryid;

    let deletedCategory = await Category.findByIdAndDelete(categoryid);

    if (!deletedCategory) {
        return next(
            new CustomError(
                `Category with id ${categoryid} cannot be deleted`,
                404
            )
        );
    }

    return sendResponse(
        res,
        200,
        "Category deleted successfully",
        deletedCategory
    );
});

module.exports.createCategory = createCategory;
module.exports.getAllCategory = getAllCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
