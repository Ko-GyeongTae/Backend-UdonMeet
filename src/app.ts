import express from 'express';
import { Loaders } from './loaders';
import 'reflect-metadata';
import config from './configs';

async function bootstrap() {
  const app: express.Application = express();

  const loaders = new Loaders();
  await loaders.init(app);

  app.listen(config.port, () => {
    console.log('Server is running on port : ' + config.port);
  });
}
bootstrap();
