const mongoose = require("mongoose");
const { imageUrl } = require("./mongooseMeddleware");

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


// @desc  set image url
// const imageUrl = (doc) => {
//     if (doc.imageCover) {
//       const imageUrl = doc.imageCover;
//       doc.imageCover = `${process.env.BASE_URL}/lands/${imageUrl}`;
//     }
//     if (doc.images) {
//       const imagesList = [];
//       doc.images.forEach((element) => {
//         imagesList.push(`${process.env.BASE_URL}/lands/${element}`);
//       });
//       doc.images = imagesList;
//     }
//   };

// getOne, getAll and update
landSchema.post("init", (doc) => {
    imageUrl(doc,"lands")
})


// create
landSchema.post("save", (doc) => {
    imageUrl(doc,"lands")
});


module.exports = mongoose.model('Land', landSchema)