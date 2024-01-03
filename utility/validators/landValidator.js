const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const { default: slugify } = require("slugify");
const categoryModel = require("../../models/categoryModel")
const landModel =require("../../models/landModel")

exports.createLandValidator = [
    check("title")
        .notEmpty()
        .withMessage(">> land title is required")
        .isString()
        .withMessage(">> land title shoud be a string value")
        .isLength({ max: 32 })
        .withMessage(">> Too long land title")
        .isLength({ min: 3 })
        .withMessage(">> Too short land title")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        })
    ,
    check("area")
        .notEmpty()
        .withMessage(">> Land area is required")
        .isNumeric()
        .withMessage(">> land area should be a number")
    ,
    check("location")
        .notEmpty().withMessage(">> land location is required")
        .isString().withMessage(">> land location must be a string value"),
    check("price")
        .notEmpty()
        .withMessage(">> land price is required")
        .isNumeric()
        .withMessage(">> land price must be a number")
        .custom((value) => {
            const price = parseFloat(value);
            if (price < 20 || price > 1000000000) {
                throw new Error(">> land price must be between 20 and 1,000,000,000");
            }
            return true;
        }),
    check("category")
        .notEmpty()
        .withMessage("land category is required")
        .custom((async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(`>> No category with this ID: ${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.getLandValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom((async (val) => {
            const land = await landModel.findById(val)
            if (!land) { throw new Error(`>> You cannot get a non-existent land: ${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.updateteLandValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom((async (val) => {
            const land = await landModel.findById(val)
            if (!land) { throw new Error(`>> You cannot update a non-existent land: ${val}`) }
            return true
        })),
    check("title")
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("category")
        .optional()
        .custom((async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(`>> No category with this ID: ${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.deleteLandValidator = [
    check("id")
        .isMongoId()
        .withMessage(">> Invalid id")
        .custom((async (val) => {
            const land = await landModel.findById(val)
            if (!land) { throw new Error(`>> You cannot update a non-existent land: ${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]