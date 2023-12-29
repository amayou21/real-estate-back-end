const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, "userID is required"],
    },
    // slug: {
    //     type: String,
    //     lowercase: true
    // },
    type: {
        type: String,
        required: [true, 'order type is required']
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)