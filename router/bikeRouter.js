const express = require('express');

const bikeController = require('./../controllers/bikeController');
const reviewRouter = require('./../router/reviewRouter');
const router = express.Router();
const authController = require('./../controllers/authController');
router.use('/:bikeId/reviews', reviewRouter);
router
  .route('/')
  .get(bikeController.getAllBike)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    bikeController.setUserId,
    bikeController.createBike
  );

router
  .route('/:id')
  .get(authController.protect, bikeController.getABike)
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    bikeController.updateBike
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    bikeController.deleteBike
  );

module.exports = router;
