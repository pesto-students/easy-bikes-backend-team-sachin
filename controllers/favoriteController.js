// const Review = require('../models/reviewModel');
const Favorite = require('../models/favouriteModel');
const factory = require('./handlerFactory');

exports.setBikeUserIds = (req, res, next) => {
  //Allows nested Routes
  if (!req.body.bike) req.body.bikes = req.params.bikeId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllFavourite = factory.getAll(Favorite);
exports.getFavourite = factory.getOne(Favorite);
exports.createFavourite = factory.createOne(Favorite);
exports.deleteFavourite = factory.deleteOne(Favorite);
