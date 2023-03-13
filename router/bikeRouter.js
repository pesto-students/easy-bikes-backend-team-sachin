const express = require('express');

const bikeController = require('./../controllers/bikeController');

const router = express.Router();

router
  .route('/')
  .get(bikeController.getAllBike)
  .post(bikeController.createBike);

router
  .route('/:id')
  .get(bikeController.getABike)
  .patch(bikeController.updateBike)
  .delete(bikeController.deleteBike);

module.exports = router;
