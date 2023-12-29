const express = require("express")
const { createLand, getLands, getLand, updateLand, deleteLand } = require("../services/landService")

const rout = express.Router()

rout.route('/')
    .get(getLands)
    .post(createLand)

rout.route('/:id')
    .get(getLand)
    .put(updateLand)
    .delete(deleteLand)

module.exports = rout