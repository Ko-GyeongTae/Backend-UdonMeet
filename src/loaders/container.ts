import Container from 'typedi';
import { BaseEntity, EntitySchema, Repository } from 'typeorm';
import { User } from '../models/entity/user.entity';
import { CustomUserRepository } from '../models/repository/user.repository';
import { AppDataSource } from './typeorm';

export const customUserRepository = new CustomUserRepository(
  User,
  AppDataSource.createEntityManager(),
);
