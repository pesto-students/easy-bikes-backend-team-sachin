const express = require('express');
const userRouter = require('./router/userRoute');
const bikeRouter = require('./router/bikeRouter');
const reviewRouter = require('./router/reviewRouter');
const favouriteRouter = require('./router/favouriteRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// 1) MIDDLEWARES
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: '10mb', extended: true }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);

app.use(cookieParser());

app.use((req, res, next) => {
  next();
});
app.use(
  hpp({
    whitelist: ['location', 'bikename'],
  })
);
// 2) ROUTES
app.use('/api/v1/easybikes/users', userRouter);
app.use('/api/v1/easybikes/bikes', bikeRouter);
app.use('/api/v1/easybikes/reviews', reviewRouter);
app.use('/api/v1/easybikes/favorite', favouriteRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
