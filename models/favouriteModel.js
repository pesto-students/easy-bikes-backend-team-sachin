const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    bikes: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bikes',
      required: [true, 'Favourite must belong to a bike.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Favourite must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

favoriteSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'bikes',
  }).populate({
    path: 'user',
    select: 'name photo',
  });

  // this.populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  next();
});

const Favorite = mongoose.model('Favourite', favoriteSchema);
module.exports = Favorite;
