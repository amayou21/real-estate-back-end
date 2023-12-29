const express = require("express")
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require("../services/orderService")
const { createOrderValidator, getOrderValidator, updateteOrderValidator, deleteOrderValidator } = require("../utility/validators/orderValidation")


const rout = express.Router()

rout.route('/')
    .get(getOrders)
    .post(createOrderValidator, createOrder)

rout.route('/:id')
    .get(getOrderValidator, getOrder)
    .put(updateteOrderValidator, updateOrder)
    .delete(deleteOrderValidator, deleteOrder)

module.exports = rout