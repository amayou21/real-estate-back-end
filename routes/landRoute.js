const express = require("express")
const {
    createLand,
    getLands,
    getLand,
    updateLand,
    deleteLand
} = require("../services/landService")
const {
    createLandValidator,
    updateteLandValidator,
    getLandValidator,
    deleteLandValidator
} = require("../utility/validators/landValidator")

const rout = express.Router()

rout.route('/')
    .get(getLands)
    .post(createLandValidator, createLand)

rout.route('/:id')
    .get(getLandValidator, getLand)
    .put(updateteLandValidator, updateLand)
    .delete(deleteLandValidator, deleteLand)
module.exports = rout