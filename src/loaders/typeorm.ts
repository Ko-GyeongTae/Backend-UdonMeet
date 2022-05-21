import { DataSource } from 'typeorm';
import { join } from 'path';
import config from '../configs';
import { User } from '../models/entity/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.typeorm.host,
  port: config.typeorm.port,
  username: config.typeorm.username,
  password: config.typeorm.password,
  database: config.typeorm.database,
  synchronize: config.typeorm.synchronize,
  logging: config.typeorm.logging,
  entities: [User],
  subscribers: [],
  migrations: [],
});
