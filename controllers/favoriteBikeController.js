const FavoriteBikes = require('./../models/favoriteBikeModel');


exports.createFavoriteBike = async (req, res) => {
    try {
      const newFavoriteBike = await FavoriteBikes.create(req.body);
  
      res.status(201).json({
        status: 'Success',
        data: {
          favoriteBikes: newFavoriteBike,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'Fail',
        message: err,
      });
    }
  };

  exports.getAllFavoriteBike = async (req, res) => {
    try {
      const favoriteBikes = await FavoriteBikes.find();
  
      res.status(201).json({
        status: 'Success',
        data: {
            favoriteBikes,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'Fail',
        message: err,
      });
    }
};

exports.deleteFavoriteBike = async (req, res, next) => {
    try {
      const favoriteBikes = await FavoriteBikes.findByIdAndDelete(req.params.id);
  
      if (!favoriteBikes) {
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