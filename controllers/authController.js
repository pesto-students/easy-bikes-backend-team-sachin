// const crypto=require('crypto');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1. Chek if email and password exist

  if (!email || !password) {
    return next();
  }

  //2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  const userpass = await user.comparePassword(password, user.password);
  if (!user || !userpass) {
    return next();
  }

  //3.If Everything ok,send token to client
  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  //1. Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new Error('You are not Logged in! Please log in to get access.')
    );
  }

  //2) Verification Token

  const decoded = await promisify(jwt.verify)(token, proccess.env.JWT_SECRET);

  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error('The User Belonging to this token no longer exists'));
  }

  //4. Check if user chenged password after the tken was issued
  if (!currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new Error('User Recently change password! Please log in again')
    );
  }

  //Grant Access
  req.user = currentUser;
  next();
};

exports.updatePassword = async (req, res, next) => {
  //1. Get user from collection

  const user = await User.findById(req.user.id).select('+password');

  //2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new Error('Your current password is wrong'));
  }

  //3. update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4.Log user in,send JWT
  createSendToken(user, 200, res);
};
// exports.forgotPassword=async (req,res,next)=>{
//   // 1. Get user from PoST email
//   const user=await User.findOne({email:req.body.email});
//   if(!user){
//     return next(new Error('There is no user with email address'));
//   }

//   //2. Generate the random reset token

//   const resetToken=user.createPasswordResetToken();
//   await user.save({validateBeforeSave:false});

//   //3. Send it to user's email
// }
