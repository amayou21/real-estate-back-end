const homeModel = require("../models/homeModel")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utility/apiError")


// @desc     create home
// @route    POST api/v1/homes
// @access   Private
exports.createHome = asyncHandler(async (req, res, next) => {
    const home = await homeModel.create(req.body)
    res.status(201).json({ data: home })
})

// @desc     get homes
// @route    GET api/v1/homes
// @access   Public
exports.getHomes = asyncHandler(async (req, res, next) => {
    const homes = await homeModel.find()
    res.status(200).json({ results: homes.length, data: homes })
})

// @desc     get home
// @route    GET api/v1/homes/:id
// @access   Public
exports.getHome = asyncHandler(async (req, res, next) => {
    const home = await homeModel.findById(req.params.id)
    !home ? next(new ApiError(`no home with this id ${req.params.id}`)) :
        res.status(200).json({ data: home })
})

// @desc     update home
// @route    PUT api/v1/homes/:id
// @access   Private
exports.updateHome = asyncHandler(async (req, res, next) => {
    const home = await homeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !home ? next(new ApiError(`no home with this id ${req.params.id}`)) :
        res.status(200).json({ message: "updated successfuly!", data: home })
})


// @desc     delete home
// @route    DELETE api/v1/homes/:id
// @access   Private
exports.deleteHome = asyncHandler(async (req, res, next) => {
    const home = await homeModel.findByIdAndDelete(req.params.id)
    !home ? next(new ApiError(`no home with this id ${req.params.id}`)) :
        res.status(201).json({ message: "deleted successfuly!" })
})