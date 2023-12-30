const landModel = require("../models/landModel")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utility/apiError")


// @desc     create land
// @route    POST api/v1/lands
// @access   Private
exports.createLand = asyncHandler(async (req, res, next) => {
    const land = await landModel.create(req.body)
    res.status(201).json({ data: land })
})

// @desc     get lands
// @route    GET api/v1/lands
// @access   Public
exports.getLands = asyncHandler(async (req, res, next) => {
    const lands = await landModel.find()
    res.status(201).json({ results: lands.length, data: lands })
})

// @desc     get land
// @route    GET api/v1/lands/:id
// @access   Public
exports.getLand = asyncHandler(async (req, res, next) => {
    const land = await landModel.findById(req.params.id)
    !land ? next(new ApiError(`no land with this id ${req.params.id}`)) :
        res.status(201).json({ data: land })
})

// @desc     update land
// @route    PUT api/v1/lands/:id
// @access   Private
exports.updateLand = asyncHandler(async (req, res, next) => {
    const land = await landModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !land ? next(new ApiError(`no land with this id ${req.params.id}`)) :
        res.status(201).json({ message: "updated successfuly!", data: land })
})

// @desc     delete land
// @route    DELETE api/v1/lands/:id
// @access   Private
exports.deleteLand = asyncHandler(async (req, res, next) => {
    const land = await landModel.findByIdAndDelete(req.params.id)
    !land ? next(new ApiError(`no land with this id ${req.params.id}`)) :
        res.status(201).json({ message: "deleted successfuly!" })
})