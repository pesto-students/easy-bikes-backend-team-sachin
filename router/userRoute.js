const express = require('express');
const authController = require('./../controllers/authController');

const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

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
