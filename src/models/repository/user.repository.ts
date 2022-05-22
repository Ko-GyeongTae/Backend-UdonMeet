import { Service } from 'typedi';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../../loaders/typeorm';
import { dtoToEntityTransformer } from '../../utils/dtoToEntity';
import { User } from '../entity/user.entity';

@Service()
export class CustomUserRepository extends Repository<User> {
  async findOneExistUserById(id: string): Promise<User | null> {
    const existUserData: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
    if (!existUserData) return null;
    return existUserData;
  }

  async findOneExistUserByEmail(email: string): Promise<User | null> {
    console.log(email);
    const existUserData: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    return existUserData;
  }

  async insertUserWithHashing<T extends User>(user: T): Promise<User | null> {
    const userEntity = new User();
    const userData = dtoToEntityTransformer(user, userEntity);

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(User, userData);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
    const data = await this.findOneExistUserByEmail(userData.email);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  async softDeleteUserById(id: string): Promise<boolean> {
    const isExist = await this.findOneExistUserById(id);
    if (!isExist || isExist.deletedAt) {
      return false;
    }

    try {
      await AppDataSource.createQueryBuilder()
        .softDelete()
        .from(User, 'user')
        .where('user.id = :id', { id })
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }
}
