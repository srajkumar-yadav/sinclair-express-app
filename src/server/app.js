import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

import { adminbroRouter } from './routes/adminbro.route';
import { awardsRouter } from './routes/awards.route';
import { gameRouter } from './routes/game.route';
import { gameSweepStakeRouter } from './routes/gameSweepStake.route';
import { sweepStakeRouter } from './routes/sweepStake.route';
import { userRouter } from './routes/user.route';
import { userGameRouter } from './routes/userGame.route';

import {
  errorHandler,
  responseHandler,
  pageNotFoundHandler,
  initResLocalsHandler,
} from './middlewares';

const app = express();

// Swagger
app.use('/swagger', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(initResLocalsHandler);

app.use('/admin', adminbroRouter);

app.use('/user', userRouter);

app.use('/game', gameRouter);

app.use('/sweepStake', sweepStakeRouter);

app.use('/userGame', userGameRouter);

app.use('/gameSweepStake', gameSweepStakeRouter);

app.use('/awards', awardsRouter);

// Use custom response handler
app.use(responseHandler);

// Use custom error handler
app.use(errorHandler);

// Page not found
app.use(pageNotFoundHandler);

export { app };
