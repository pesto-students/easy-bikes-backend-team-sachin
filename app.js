const express = require('express');
const userRouter = require('./router/userRoute');
const bikeRouter = require('./router/bikeRouter');
const favoriteBikeRouter = require('./router/favoriteBikeRouter');

const app = express();

// 1) MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello World');
  next();
});

// 3) ROUTES
app.use('/api/v1/easybikes/users', userRouter);
app.use('/api/v1/easybikes/bikes', bikeRouter);
app.use('/api/v1/easybikes/favoriteBikes', favoriteBikeRouter);
module.exports = app;
