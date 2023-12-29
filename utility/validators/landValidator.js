const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.createLandValidator = [
    check("title")
        .notEmpty()
        .withMessage("land title is required")
        .isString()
        .withMessage("land title shoud be a string value")
        .isLength({ max: 32 })
        .withMessage("too long land title")
        .isLength({ min: 3 })
        .withMessage("too short land title")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        })
    ,
    check("area")
        .notEmpty()
        .withMessage("Land type is required")
        .isNumeric()
        .withMessage("land area should be a number")
    ,
    check("location")
        .notEmpty().withMessage("land location is required")
        .isString().withMessage("land location must be a string value"),
    check("price")
        .notEmpty()
        .withMessage("land price is required")
        .isNumeric()
        .withMessage("land price must be a number")
        .isLength({ max: 1000000000 })
        .withMessage("Too long land price")
        .isLength({ min: 20 })
        .withMessage("Too short land price")
    ,

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