const categoryModel = require("../models/categoryModel")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utility/apiError")
const factory = require("./handelFactory")

exports.filterObject = asyncHandler(async (req, res, next) => {
    if (req.query.fields) {
        let fields = req.query.fields
        fields = fields.split(",").join(" ")
        req.filterObject = fields
    } else { req.filterObject = "-__v" }

    next()
})

// @desc     create category
// @route    POST api/v1/categorys
// @access   Private
exports.createCategory = factory.createOne(categoryModel)

// @desc     get categorys
// @route    GET api/v1/categorys
// @access   Public
exports.getCategories = factory.getAll(categoryModel)

// @desc     get category
// @route    GET api/v1/categorys/:id
// @access   Public
exports.getCategory = factory.getOne(categoryModel)

// @desc     update category
// @route    PUT api/v1/categorys/:id
// @access   Private
exports.updateCategory = factory.updateOne(categoryModel)

// @desc     delete category
// @route    DELETE api/v1/categorys/:id
// @access   Private
exports.deleteCategory = factory.deleteOne(categoryModel)