const { validationResult } = require("express-validator");
const Product = require("../models/product.model");
const sendResponse = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createProduct = asyncErrorHandler(async (req, res, next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = errors.errors.map((e) => e.msg).join(", ");
        return next(new CustomError(error, 400));
    }

    let { name, description, price, category, inStock, brand } = req.body;

    let newproduct = await new Product({
        name,
        description,
        price: +price,
        category,
        inStock: +inStock,
        brand,
        image: req?.file?.filename || "",
    }).save();

    if (!newproduct) {
        return next(new CustomError("Product Cannot Be Created", 400));
    }

    return sendResponse(res, 201, "Product Created", newproduct);
});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    let products = await Product.find().populate("category");

    return sendResponse(res, 200, "All Products", products);
});

const getSingleProduct = asyncErrorHandler(async (req, res, next) => {
    let id = req.params.id;
    let product = await Product.findById(id).populate("category");

    if (product) {
        return sendResponse(res, 200, "Produc Fetched Successfully", product);
    }

    return next(new CustomError("Invalid Product Id", 400));
});

module.exports.createProduct = createProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.getSingleProduct = getSingleProduct;
