const categoryModel = require("../models/categoryModel")
const asyncHandler = require("express-async-handler")
const factory = require("./handelFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadImage } = require("../middleware/uploadImageMiddelware");


exports.uploadImage = uploadImage("image")

exports.resizeImage = asyncHandler(async (req, res, next) => {
    const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(900, 900)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/categories/${fileName}`);
        req.body.image = fileName;
    }
    next();
});


// exports.filterObject = asyncHandler(async (req, res, next) => {
//     if (req.query.field) {
//         let fields = req.query.field
//         fields = fields.split(",").join(" ")
//         req.filterObject = fields
//     } else { req.filterObject = "-__v" }

//     next()
// })

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