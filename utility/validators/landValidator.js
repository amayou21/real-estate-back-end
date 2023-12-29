const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");

exports.createLandValidator = [
    check("title")
        .notEmpty()
        .withMessage("land title is required")
        .isMongoId()
        .withMessage("invalid id")
    ,
    check("type")
        .notEmpty()
        .withMessage("Land type is required"),
    ValidatoreMiddleware,
]

exports.getLandValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]

exports.updateteLandValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]

exports.deleteLandValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]