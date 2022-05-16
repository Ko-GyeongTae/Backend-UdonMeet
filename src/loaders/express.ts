import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

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
  app.use(bodyParser.urlencoded({ extended: false }));

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
