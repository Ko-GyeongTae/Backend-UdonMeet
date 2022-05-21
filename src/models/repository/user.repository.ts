import { InsertResult, Repository } from 'typeorm';
import { AppDataSource } from '../../loaders/typeorm';
import { dtoToEntityTransformer } from '../../utils/dtoToEntity';
import { User } from '../entity/user.entity';

export class CustomUserRepository extends Repository<User> {
  async findOneExistUserById(id: string): Promise<User | undefined> {
    const existUserData: User = await AppDataSource.createQueryBuilder()
      .select()
      .from(User, 'user')
      .where({ id })
      .andWhere({ deletedAt: null })
      .execute();
    if (!existUserData) return undefined;
    return existUserData;
  }

  async findOneExistUserByEmail(email: string): Promise<User | undefined> {
    const existUserData: User = await AppDataSource.createQueryBuilder()
      .select()
      .from(User, 'user')
      .where({ email })
      .andWhere({ deletedAt: null })
      .execute();
    if (!existUserData) return undefined;
    return existUserData;
  }

  async insertUserWithHashing<T extends User>(user: T): Promise<InsertResult> {
    const userEntity = new User();
    const userData = dtoToEntityTransformer(user, userEntity);

    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(userData)
      .execute();
    return data;
  }
}
