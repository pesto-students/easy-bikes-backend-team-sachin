const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');

exports.setBikeUserIds = (req, res, next) => {
  //Allows nested Routes
  if (!req.body.bike) req.body.bikes = req.params.bikeId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
