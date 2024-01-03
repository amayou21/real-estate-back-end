const express = require("express")
const {
    createLand,
    getLands,
    getLand,
    updateLand,
    deleteLand,
    resizeLandImages,
    uploadLandImages
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
    .post(uploadLandImages,resizeLandImages,createLandValidator, createLand)

rout.route('/:id')
    .get(getLandValidator, getLand)
    .put(updateteLandValidator, updateLand)
    .delete(deleteLandValidator, deleteLand)
module.exports = rout