const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const { default: slugify } = require("slugify");
const homeModel = require("../../models/homeModel");
const categoryModel = require("../../models/categoryModel")

exports.createHomeValidator = [
    check("title")
        .notEmpty()
        .withMessage(">> home title is required")
        .isString()
        .withMessage(">> home title should be a string value")
        .isLength({ max: 32 })
        .withMessage(">> too long home title")
        .isLength({ min: 2 })
        .withMessage(">> too short land title")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("type")
        .notEmpty()
        .withMessage(">> home title is required")
        .isString()
        .withMessage(">> home title must be a string value"),
    check("area")
        .notEmpty()
        .withMessage(">> home area is required")
        .isNumeric()
        .withMessage(">> home area should be a number"),
    check("location")
        .notEmpty()
        .withMessage(">> home location is required")
        .isString()
        .withMessage(">> home location must be a string value"),
    check("price")
        .notEmpty()
        .withMessage(">> home price is required")
        .isNumeric()
        .withMessage(">> home price must be a number")
        .custom((value) => {
            const price = parseFloat(value);
            if (price < 20 || price > 1000000000) {
                throw new Error(">> Home price must be between 20 and 1,000,000,000");
            }
            return true;
        }),
    check("bedrooms")
        .notEmpty()
        .withMessage(">> home bedrooms is required")
        .isNumeric()
        .withMessage(">> home bedrooms must be a number"),
    check("bathrooms")
        .optional()
        .isNumeric()
        .withMessage(">> home bathrooms must be a number"),
    check("category")
        .notEmpty()
        .withMessage(">> home category is required")
        .isMongoId()
        .withMessage(">> invalid category ID")
        .custom(async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(`>> No category with this ID : ${val}`) }
        })
    ,
    ValidatoreMiddleware,
]

exports.getHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom(async (val) => {
            const home = await homeModel.findById(val)
            if (!home) { throw new Error(`>> You cannot get a non-existent home: ${val}`) }
        }),
    ValidatoreMiddleware,
]

exports.updateteHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom(async (val) => {
            const home = await homeModel.findById(val)
            if (!home) { throw new Error(`>> You cannot update a non-existent home: ${val}`) }
        }),
    check("title")
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("category")
        .optional()
        .custom(async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(`>> No category with this ID : ${val}`) }
        })
    ,
    ValidatoreMiddleware,
]

exports.deleteHomeValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom(async (val) => {
            const home = await homeModel.findById(val)
            if (!home) { throw new Error(`>> You cannot delete a non-existent home: ${val}`) }
        }),
    ValidatoreMiddleware,
]