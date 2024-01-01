const mongoose = require("mongoose")

const homeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "home title is required"],
        unique: [true, "home title must be unique"],
        minLength: [2, "Too short home title"],
        maxLength: [32, "Too long home title"],
    },
    slug: {
        type: String,
        lowercase: true
    },
    type: {
        type: String,
        required: [true, "home type is required"]
    }
    ,
    area: {
        type: Number,
        required: [true, "home area is required"],
    },
    location: {
        type: String,
        required: [true, "home location is required"],
    },
    price: {
        type: Number,
        required: [true, "home price is required"],
        max: [1000000000, "Too long price"],
        min: [20, "Too short home price"]
    },
    bedrooms: {
        type: Number,
        required: [true, "home bedrooms id required"],
    },
    bathrooms: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["sell", "buy", "rent"],
        default: "buy",
    },
    imageCover: {
        type: String
    },
    images: {
        type: [String]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required:[true,"home category is required"]
    }

}, { timestamps: true })

module.exports = mongoose.model('Home', homeSchema)