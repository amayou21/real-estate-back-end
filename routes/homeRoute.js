const express = require("express")
const {
    createHome,
    getHomes,
    getHome,
    updateHome,
    deleteHome,
    resizeHomeImages,
    uploadHomeImages
} = require("../services/homeService")
const {
    createHomeValidator,
    getHomeValidator,
    updateteHomeValidator,
    deleteHomeValidator
} = require("../utility/validators/homeValidator")

const rout = express.Router()

rout.route('/')
    .get(getHomes)
    .post(uploadHomeImages,resizeHomeImages,createHomeValidator, createHome)

rout.route('/:id')
    .get(getHomeValidator, getHome)
    .put(updateteHomeValidator, updateHome)
    .delete(deleteHomeValidator, deleteHome)
module.exports = rout