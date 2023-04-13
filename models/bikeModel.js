const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
  {
    image: {
      type: Object,
    },
    bikename: {
      type: String,
      required: [true, 'Please Tell us your name'],
    },
    year: {
      type: Number,
    },
    ownername: {
      type: String,
      required: [true, 'need Owner name'],
    },
    contactnumber: {
      type: Number,
      required: [true, 'Need contact number'],
    },
    brand: {
      type: String,
    },
    location: {
      type: String,
      required: [true, 'Please confirm your password'],
    },
    bikeprice: {
      type: Number,
      required: [true, 'Please Provide bike price'],
    },
    bikenumber: {
      type: String,
      required: [true, 'Please Provide bike no.'],
      unique: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Bike must belong to a user.'],
    },
    // userId: {
    //   type: types.ObjectId,
    //   ref: 'user',
    // }
  },
  // {
  //   timestamps: true,
  // },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bikeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});
//Virtual Populate
bikeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'bikes',
  localField: '_id',
});

const Bikes = mongoose.model('Bikes', bikeSchema);
module.exports = Bikes;
