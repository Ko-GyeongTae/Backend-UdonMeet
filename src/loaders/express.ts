import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import Container from 'typedi';
import { validateBodyMiddleware } from '../utils/validateMiddleware';
import { SignInDto, SignUpDto } from '../models/dto/user.dto';
import { CustomUserRepository } from '../models/repository/user.repository';
import { User } from '../models/entity/user.entity';
import { AppDataSource } from './typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import router from '../routes';

export default async ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    console.log(req.ip);
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use(cors());
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', router);
  // ...미들웨어들
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({
        message: err.message,
      })
      .end();
  });
  // express app으로 return
  return app;
};
