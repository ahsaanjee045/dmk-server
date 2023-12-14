const { check } = require("express-validator");

module.exports.productValidation = [
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Proudct name cannot be empty"),
    check("price")
        .isNumeric()
        .withMessage("Product price must be a number")
        .custom((value) => {
            return +value > 0;
        })
        .withMessage("Price must be greater than zero"),
];

// .custom((value) => {
//     return isNaN(Number(value)) ? false : true
// }).withMessage("Proudct Price must be a number")
