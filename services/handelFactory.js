const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utility/ApiFeautures")

exports.createOne = (model) => asyncHandler(async (req, res) => {
    const doc = await model.create(req.body)
    res.status(201).json({ data: doc })
})


exports.getAll = (model) => asyncHandler(async (req, res) => {
    //@desc  documents count
    const docemuntCount = await model.countDocuments();

    const apiFeatures = new ApiFeatures(model.find(), req.query)
        .paginate(docemuntCount)
        .limitFields()
        .sort()
        .fielter()


    const { paginationResult, mongooseQuery } = apiFeatures
    const doucements = await mongooseQuery
    // const doucements = await model.find().skip(skip).limit(limit)
    //     .select(req.filterObject)
    res.status(200).json({ paginationResult, results: doucements.length, data: doucements })
})

exports.getOne = (model) => asyncHandler(async (req, res, next) => {
    const document = await model.findById(req.params.id)
    !document ? next(new ApiError(`no document with this id ${req.params.id}`)) :
        res.status(200).json({ data: document })
})

exports.updateOne = (model) => asyncHandler(async (req, res, next) => {
    const doucement = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !doucement ? next(new ApiError(`no doucement with this id ${req.params.id}`)) :
        res.status(200).json({ message: "updated successfuly!", data: doucement })
})

exports.deleteOne = (model) => asyncHandler(async (req, res, next) => {
    const doucement = await model.findByIdAndDelete(req.params.id)
    !doucement ? next(new ApiError(`no doucement with this id ${req.params.id}`)) :
        res.status(201).json({ message: "deleted successfuly!" })
})