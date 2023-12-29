const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");


exports.createOrderValidator = [
    check("userID")
        .notEmpty()
        .withMessage("user id is required")
        .isMongoId()
        .withMessage("invalid id")
    ,
    check("type")
        .notEmpty()
        .withMessage("order type is required"),
    ValidatoreMiddleware,
]

exports.getOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]

exports.updateteOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]

exports.deleteOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]