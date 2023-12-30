const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.createHomeValidator = [
    check("title")
        .notEmpty()
        .withMessage("ome title is required")
        .isString()
        .withMessage("home title should be a string value")
        .isLength({ max: 32 })
        .withMessage("too long home title")
        .isLength({ min: 2 })
        .withMessage("too short land title")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("type")
        .notEmpty()
        .withMessage("home title is required")
        .isString()
        .withMessage("home title must be a string value"),
    check("area")
        .notEmpty()
        .withMessage("home area is required")
        .isNumeric()
        .withMessage("home area should be a number"),
    check("location")
        .notEmpty()
        .withMessage("home location is required")
        .isString()
        .withMessage("home location must be a string value"),
    check("price")
        .notEmpty()
        .withMessage("home price is required")
        .isNumeric()
        .withMessage("home price must be a number")
        .custom((value) => {
            const price = parseFloat(value);
            if (price < 20 || price > 1000000000) {
                throw new Error("Home price must be between 20 and 1,000,000,000");
            }
            return true;
        }),
    check("bedrooms")
        .notEmpty()
        .withMessage("home bedrooms is required")
        .isNumeric()
        .withMessage("home bedrooms must be a number"),
    check("bathrooms")
        .optional()
        .isNumeric()
        .withMessage("home bathrooms must be a number"),
    ValidatoreMiddleware,
]

exports.getHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]

exports.updateteHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    check("title")
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        })
    ,
    ValidatoreMiddleware,
]

exports.deleteHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]