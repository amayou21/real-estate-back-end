const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: true,
        maxLength: [32, "Too long category name"],
        minLength: [2, "Too short category name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String,
        required: [true, "category image is required"]
    }
}, { timestamps: true })




// @desc  set image url
const imageUrl = (doc) => {
    if (doc.image) {
        const imageUrl = doc.image;
        doc.image = `${process.env.BASE_URL}/categories/${imageUrl}`;
    }
}
// getOne ,getAll and update
categorySchema.post("init", (doc) => {
    imageUrl(doc)
})
categorySchema.post("save", (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate key error
        next(new Error('Category name must be unique.'));
    } else {
        next(error);
    }
});

// create
categorySchema.post("save", (doc) => {
    imageUrl(doc)

});

module.exports = mongoose.model("Category", categorySchema)