const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const categoryModel = require("../../models/categoryModel");
const { default: slugify } = require("slugify");

exports.createCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("category name is required")
        .custom(val => {
            if (!isNaN(val) || !isNaN(parseFloat(val)))
                throw new Error(`category name must be a string ${val}`)
            return true
        })
        .custom(async (value) => {
            const existingCategory = await categoryModel.findOne({ name: value });
            if (existingCategory) {
                throw new Error("This category already exists");
            }
            return true;
        })
        .isLength({ max: 32 })
        .withMessage("Too long category name")
        .isLength({ min: 2 })
        .withMessage("Too short category name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("image").notEmpty().withMessage("category image is required"),
    ValidatoreMiddleware,
]

exports.getCategoryValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id")
        // @desc check if the ID are exist in our db befor passing the requiest to db
        .custom((async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(`You cannot get a non-existent category: :${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.updateteCategoryValidator = [
    check("name")
        .optional()
        .custom(async (value) => {
            const existingCategory = await categoryModel.findOne({ name: value });
            if (existingCategory) {
                throw new Error("This category already exists");
            }
            return true;
        })
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check("id")
        .isMongoId()
        .withMessage(" invalid id")
        // @desc check if the ID are exist in our db befor passing the requiest to db
        .custom((async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(` You cannot update a non-existent category:${val}`) }
            return true
        })),
    check("image").optional(),
    ValidatoreMiddleware,
]

exports.deleteCategoryValidator = [
    check("id")
        .isMongoId()
        .withMessage(" invalid id")
        .custom(async (val) => {
            const category = await categoryModel.findById(val)
            if (!category) { throw new Error(` You cannot delete a non-existent category: ${val}`) }
        }),
    ValidatoreMiddleware,
]