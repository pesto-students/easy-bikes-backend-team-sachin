
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Tell us Your email in string'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    mobileNumber: {
      type: Number,
    },
    photo: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      // required: [true, 'Please provide a password'],
      // minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      // required: [true, 'Please confirm your password'],
      // validate: {
      //   validator: function (el) {
      //     return el === this.password;
      //   },
      //   message: 'Passwords are not same',
      // },
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('bikes', {
  ref: 'Bikes',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('favourite', {
  ref: 'Favourite',
  foreignField: 'user',
  localField: '_id',
});
userSchema.pre('save', async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash The password
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passworConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  //This pints to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  //False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
