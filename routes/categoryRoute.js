const express = require("express")
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    filterObject
} = require("../services/categoryService")
const {
    createCategoryValidator,
    getCategoryValidator,
    updateteCategoryValidator,
    deleteCategoryValidator
} = require("../utility/validators/categoryValidation")

const rout = express.Router()

rout.route('/')
    .get(filterObject, getCategories)
    .post(createCategoryValidator, createCategory)

rout.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateteCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory)
module.exports = rout