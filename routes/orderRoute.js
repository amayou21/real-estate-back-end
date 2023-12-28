const express = require("express")
const { createOrder } = require("../services/orderService")


const rout = express.Router()

rout.route('/')
    // .get()
    .post(createOrder)
// .delete()
// .put()

module.exports = rout