const asyncHandler = require("express-async-handler")
const orderModel = require("../models/orderModel")
const ApiError = require("../utility/apiError")

// @desc       create order
// @route      POST /api/v1/orders
// @access     Private
exports.createOrder = asyncHandler(async (req, res, next) => {
    const data = await orderModel.create(req.body)
    res.status(201).json({ data })
})

// @desc       get orders
// @route      GET /api/v1/orders
// @access     Public
exports.getOrders = asyncHandler(async (req, res, next) => {
    const data = await orderModel.find()
    res.status(200).json({ result: data.length, data })
})

// @desc       get order
// @route      GET /api/v1/orders/:id
// @access     Public
exports.getOrder = asyncHandler(async (req, res, next) => {
    const data = await orderModel.findById(req.params.id)
    !data ? next(new ApiError(`noo order with this ID :${req.params.id}`, 404)) :
        res.status(200).json({ result: data.length, data })
})

// @desc       update order
// @route      PUT /api/v1/orders/:id
// @access     Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
    const data = await orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !data ? next(new ApiError(`no order with this ID :${req.params.id}`, 404)) :
        res.status(200).json({ result: data.length, data })
})

// @desc       delete order
// @route      DELETE /api/v1/orders/:id
// @access     Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const data = await orderModel.findByIdAndDelete(req.params.id)
    if (!data) { next(new ApiError(`no order with this ID :${req.params.id}`, 404)) }
    res.status(200).json({ message: "deleted successfuly!" })
})