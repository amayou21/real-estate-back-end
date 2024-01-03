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
        max: [1000000000, "Too longe land price"],
        min: [20, "Too short land price"]

    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, "land category is required"]
    },
    imageCover: {
        type: String,
        required: [true, "land image cob=ver is required"]
    },
    images: {
        type: [String]
    }

}, { timestamps: true })

module.exports = mongoose.model('Land', landSchema)