import 'dotenv/config';

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  typeorm: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    logging: process.env.NODE_ENV === 'production' ? false : true,
  },
  jwtSecret: process.env.JWT_SECRET,
};
