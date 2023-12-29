const mongoose = require("mongoose")

const landSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "land title is required"],
        unique: [true, "land title must be unique"],
        minLength: [3, "Too short land title"],
        maxLength: [32, "Too long land title"],
    },
    slug: {
        type: String,
        lowercase: true
    },
    area: {
        type: Number,
        required: [true, "land area is required"],
    },
    location: {
        type: String,
        required: [true, "land location is required"],
    },
    price: {
        type: Number,
        required: [true, "land price is required"],
        length: { max: 1000000000, min: 20 }

    },
    imageCover: {
        type: String
    },
    images: {
        type: [String]
    }

}, { timestamps: true })

module.exports = mongoose.model('Land', landSchema)