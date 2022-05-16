import express from 'express';
import expressLoader from './express';
import { AppDataSource } from './typeorm';

export class Loaders {
  init = async (expressApp: express.Application): Promise<void> => {
    await AppDataSource.initialize();
    console.log('Typeorm Intialized');
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');

    // ... 더 많은 loaders가 가능합니다

    // ... agenda 초기화
    // ... 또는 Redis 등등
  };
}
