const Product = require("../models/product.model");
const sendResponse = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createProduct = asyncErrorHandler(async (req, res, next) => {
    let { name, description, price, category, inStock } = req.body;

    let newproduct = await new Product({
        name,
        description,
        price: +price,
        category,
        inStock: +inStock,
    }).save();

    if (!newproduct) {
        return next(new CustomError("Product Cannot Be Created", 400));
    }

    return sendResponse(res, 201, "Product Created", newproduct);
});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {

    let products = await Product.find().populate("category reviews.userid");

    return sendResponse(res, 200, "All Products", products);
});

module.exports.createProduct = createProduct;
module.exports.getAllProducts = getAllProducts;
