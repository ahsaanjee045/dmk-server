const express = require("express");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
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
router.put("/:id", verifyUser, verifyAdmin, upload.single("image"), updateProduct)
router.delete("/:id", verifyUser, verifyAdmin, deleteProduct)

module.exports = router;
