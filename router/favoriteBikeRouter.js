const express = require('express');

const favoriteBikeController = require('./../controllers/favoriteBikeController');

const router = express.Router();

router
  .route('/')
  .get(favoriteBikeController.getAllFavoriteBike)
  .post(favoriteBikeController.createFavoriteBike);

router
  .route('/:id')
  .delete(favoriteBikeController.deleteFavoriteBike);

module.exports = router;