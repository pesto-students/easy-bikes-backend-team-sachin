const express = require('express');
const authController = require('./../controllers/authController');

const userController = require('./../controllers/userController');
const favoriteRouter = require('./../router/favouriteRouter');
const router = express.Router();
router.use('/:bikeId/favorite', favoriteRouter);
//If user want to create account ar login it will go to signup or login
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/social-login', authController.socialLogin);

//forgot Password
//reset Password

//Protect all routes
router.use(authController.protect);
router.patch('/updatePassword', authController.updatePassword);

router.get(
  '/favorites',
  userController.getMe,
  userController.getUserWithFavorite
);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
