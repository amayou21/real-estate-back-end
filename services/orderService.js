const asyncHandler = require("express-async-handler")
const orderModel = require("../models/orderModel")
// const orderModel = require("../models/order")
exports.createOrder = asyncHandler(async (req, res, next) => {
    // console.log(req.body.userid);
    const { userID } = req.body
    const data = await orderModel.create({ userID })
    res.status(200).json({ data })
    // res.status(200).json({ id: req.body.userid })
}) 