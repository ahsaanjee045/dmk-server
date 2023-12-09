const express = require("express")
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller")

const router = express.Router()


router.post("/create", createCategory)
router.put("/:categoryid", updateCategory)
router.delete("/:categoryid", deleteCategory)
router.get("/", getAllCategory)

module.exports = router