const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ApiFeatures = require('../utils/apifeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: true,
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that Id', 404));
    }

    res.status(200).json({
      status: true,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: true,
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, PopOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (PopOptions) query = query.populate(PopOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: true,
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    // To Allow for nested GET reviews on bikes
    let filter = {};
    if (req.params.bikeId) filter = { bike: req.params.bikeId };

    const apiFeature = new ApiFeatures(Model.find(), req.query).search()
    const doc = await apiFeature.query;
    // let bikes = await apiFeature.query;

    // bikes = await apiFeature.query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(201).json({
      status: true,
      count : doc.length,
      data: {
        data: doc
      },
    });
  });
