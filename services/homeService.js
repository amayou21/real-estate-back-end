// const multer = require("multer");
const homeModel = require("../models/homeModel")
const factory = require("./handelFactory")
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadGalleryOfImages } = require("../middleware/uploadImageMiddelware");

// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true);
//     } else {
//         cb(new ApiError("only images allowed", 400), false);
//     }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter })



exports.uploadHomeImages = uploadGalleryOfImages([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 4 },
])
//  upload.fields()


exports.resizeHomeImages = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const fileName = `home-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/homes/${fileName}`);
        req.body.imageCover = fileName;
    }
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (val, index) => {
                const fileName = `home-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(val.buffer)
                    .resize(900, 900)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/homes/${fileName}`);
                req.body.images.push(fileName);
            })
        );

        next();
    }
});



// @desc     create home
// @route    POST api/v1/homes
// @access   Private
exports.createHome = factory.createOne(homeModel)

// @desc     get homes
// @route    GET api/v1/homes
// @access   Public
exports.getHomes = factory.getAll(homeModel)

// @desc     get home
// @route    GET api/v1/homes/:id
// @access   Public
exports.getHome = factory.getOne(homeModel)

// @desc     update home
// @route    PUT api/v1/homes/:id
// @access   Private
exports.updateHome = factory.updateOne(homeModel)


// @desc     delete home
// @route    DELETE api/v1/homes/:id
// @access   Private
exports.deleteHome = factory.deleteOne(homeModel)