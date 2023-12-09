const express = require("express");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
    createProduct,
    getAllProducts,
} = require("../controllers/product.controller");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", verifyUser, verifyAdmin,  createProduct);
router.get("/", getAllProducts);

module.exports = router;
