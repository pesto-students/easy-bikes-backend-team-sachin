const cloudinary = require('../utils/cloudinary');
const Bikes = require('./../models/bikeModel');
const factory = require('./handlerFactory');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createBike = async (req, res) => {
  const {
    bikename,
    brand,
    year,
    ownername,
    contactnumber,
    location,
    bikeprice,
    bikenumber,
    description,
    image,
    user,
  } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'easybikes',
      });

      if (uploadedResponse) {
        const document = new Bikes({
          bikename,
          brand,
          year,
          ownername,
          contactnumber,
          location,
          bikenumber,
          description,
          bikeprice,
          image: uploadedResponse,
          user,
        });

        const doc = await document.save();
        res.status(201).json({
          status: true,
          data: {
            data: doc,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.createBike = factory.createOne(Bikes);

exports.getAllBike = factory.getAll(Bikes);

exports.getABike = factory.getOne(Bikes, { path: 'reviews' });

exports.updateBike = factory.updateOne(Bikes);

exports.deleteBike = factory.deleteOne(Bikes);
