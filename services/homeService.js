const homeModel = require("../models/homeModel")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utility/apiError")
const factory = require("./handelFactory")

// @desc     create home
// @route    POST api/v1/homes
// @access   Private
exports.createHome = factory.createOne(homeModel)

// @desc     get homes
// @route    GET api/v1/homes
// @access   Public
exports.getHomes = factory.getAll(homeModel)

// @desc     get home
// @route    GET api/v1/homes/:id
// @access   Public
exports.getHome = factory.getOne(homeModel)

// @desc     update home
// @route    PUT api/v1/homes/:id
// @access   Private
exports.updateHome = factory.updateOne(homeModel)


// @desc     delete home
// @route    DELETE api/v1/homes/:id
// @access   Private
exports.deleteHome = factory.deleteOne(homeModel)