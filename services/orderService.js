const asyncHandler = require("express-async-handler")
const orderModel = require("../models/orderModel")
const ApiError = require("../utility/apiError")
const factory = require("./handelFactory")


// @desc       create order
// @route      POST /api/v1/orders
// @access     Private
exports.createOrder = factory.createOne(orderModel)
// @desc       get orders
// @route      GET /api/v1/orders
// @access     Public
exports.getOrders = factory.getAll(orderModel)

// @desc       get order
// @route      GET /api/v1/orders/:id
// @access     Public
exports.getOrder = factory.getOne(orderModel)
// @desc       update order
// @route      PUT /api/v1/orders/:id
// @access     Private
exports.updateOrder = factory.updateOne(orderModel)

// @desc       delete order
// @route      DELETE /api/v1/orders/:id
// @access     Private
exports.deleteOrder = factory.deleteOne(orderModel)