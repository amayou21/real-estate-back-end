const landModel = require("../models/landModel")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utility/apiError")
const factory = require("./handelFactory")

// @desc     create land
// @route    POST api/v1/lands
// @access   Private
exports.createLand = factory.createOne(landModel)

// @desc     get lands
// @route    GET api/v1/lands
// @access   Public
exports.getLands = factory.getAll(landModel)

// @desc     get land
// @route    GET api/v1/lands/:id
// @access   Public
exports.getLand = factory.getOne(landModel)

// @desc     update land
// @route    PUT api/v1/lands/:id
// @access   Private
exports.updateLand = factory.updateOne(landModel)

// @desc     delete land
// @route    DELETE api/v1/lands/:id
// @access   Private
exports.deleteLand = factory.deleteOne(landModel)