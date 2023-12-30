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
        .withMessage("Land area is required")
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
        .custom((value) => {
            const price = parseFloat(value);
            if (price < 20 || price > 1000000000) {
                throw new Error("land price must be between 20 and 1,000,000,000");
            }
            return true;
        }),
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
    check("title")
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("price")
        .optional()
        .isNumeric()
        .withMessage("land price must be a number")
        .custom((value) => {
            const price = parseFloat(value);
            if (price < 20 || price > 1000000000) {
                throw new Error("land price must be between 20 and 1,000,000,000");
            }
            return true;
        }),
    ValidatoreMiddleware,
]

exports.deleteLandValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]