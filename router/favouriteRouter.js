const express = require('express');

const favoriteController = require('../controllers/favoriteController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(favoriteController.getAllFavourite)
  .post(
    authController.restrictTo('user'),
    favoriteController.setBikeUserIds,
    favoriteController.createFavourite
  );

router
  .route('/:id')
  .get(favoriteController.getFavourite)
  .delete(
    authController.restrictTo('admin', 'user'),
    favoriteController.deleteFavourite
  );

module.exports = router;
