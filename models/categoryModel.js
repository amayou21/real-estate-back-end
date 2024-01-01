const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: [true, "category name must be unique"],
        maxLength: [32, "Too long category name"],
        minLength: [2, "Too short category name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)