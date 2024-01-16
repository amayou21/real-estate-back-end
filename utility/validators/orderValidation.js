const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatorMiddleware");
const orderModel = require("../../models/orderModel");

exports.createOrderValidator = [
    check("userID")
        .notEmpty()
        .withMessage("user id is required")
        .isMongoId()
        .withMessage("invalid id")
    ,
    check("type")
        .notEmpty()
        .withMessage("order type is required"),
    ValidatoreMiddleware,
]

exports.getOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id")
        // @desc check if the ID are exist in our db befor passing the requiest to db
        .custom((async (val, { req, res, next }) => {
            const data = await orderModel.findById(val)
            if (!data) { throw new Error(`no order with this ID :${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.updateteOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id")
        // @desc check if the ID are exist in our db befor passing the requiest to db
        .custom((async (val, { req, res, next }) => {
            const data = await orderModel.findById(val)
            if (!data) { throw new Error(`no order with this ID :${val}`) }
            return true
        })),
    ValidatoreMiddleware,
]

exports.deleteOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid id"),
    ValidatoreMiddleware,
]