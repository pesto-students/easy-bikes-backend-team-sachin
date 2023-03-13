const Bikes = require('./../models/bikeModel');

exports.createBike = async (req, res) => {
  try {
    const newBike = await Bikes.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        bikes: newBike,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getAllBike = async (req, res) => {
  try {
    const bikes = await Bikes.find();

    res.status(201).json({
      status: 'Success',
      data: {
        bikes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getABike = async (req, res) => {
  try {
    const bike = await Bikes.findById(req.params.id);

    res.status(201).json({
      status: 'Success',
      data: {
        bike,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.updateBike = async (req, res, next) => {
  try {
    const bike = await Bikes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bike) {
      return next(new Error('No tour found with that Id'));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        bike,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: err,
    });
  }
};

exports.deleteBike = async (req, res, next) => {
  try {
    const bike = await Bikes.findByIdAndDelete(req.params.id);

    if (!bike) {
      return next(new Error('No Bike found by this id'));
    }
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
