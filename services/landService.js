const asyncHandler = require("express-async-handler")
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp")
const landModel = require("../models/landModel")
const factory = require("./handelFactory")

const { uploadGalleryOfImages } = require("../middleware/uploadImageMiddelware")
exports.uploadLandImages = uploadGalleryOfImages([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 4 },
])

exports.resizeLandImages = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const fileName = `land-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/lands/${fileName}`);
        req.body.imageCover = fileName;
    }
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (val, index) => {
                const fileName = `land-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(val.buffer)
                    .resize(900, 900)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/lands/${fileName}`);
                req.body.images.push(fileName);
            })
        );
    }
    next();
});
// @desc     create land
// @route    POST api/v1/lands
// @access   Private
exports.createLand = factory.createOne(landModel)

// @desc     get lands
// @route    GET api/v1/lands
// @access   Public
exports.getLands = factory.getAll(landModel)

// @desc     get land
// @route    GET api/v1/lands/:id
// @access   Public
exports.getLand = factory.getOne(landModel)

// @desc     update land
// @route    PUT api/v1/lands/:id
// @access   Private
exports.updateLand = factory.updateOne(landModel)

// @desc     delete land
// @route    DELETE api/v1/lands/:id
// @access   Private
exports.deleteLand = factory.deleteOne(landModel)