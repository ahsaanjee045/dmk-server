const express = require("express");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
} = require("../controllers/product.controller");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");
const upload = require("../utils/imageUpload");
const { productValidation } = require("../utils/productValidations");

const router = express.Router();

router.post(
    "/create",
    verifyUser,
    verifyAdmin,
    upload.single("image"),
    ...productValidation,
    createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
