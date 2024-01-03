const multer = require("multer");
const ApiError = require("../utility/apiError");

const multerOptions = () => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new ApiError("only images allowed", 400), false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
    return upload
}

// @desc upload single image
exports.uploadImage = (fieldName) => {
    return multerOptions().single(fieldName)
}

// @desc upload galery of images
exports.uploadGalleryOfImages = (fieldName) => {
    return multerOptions().fields(fieldName);
};
