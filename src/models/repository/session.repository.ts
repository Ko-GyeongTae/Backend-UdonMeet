import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../loaders/typeorm';
import { Session } from '../entity/session.entity';

@Service()
export class CustomSessionRepository extends Repository<Session> {
  async findNewestSessionByRefreshToken(
    refreshToken: string,
  ): Promise<Session | null> {
    return await AppDataSource.createQueryBuilder()
      .select('session')
      .from(Session, 'session')
      .where('refreshToken = :refreshToken', { refreshToken })
      .orderBy('session.createdAt', 'DESC')
      .getOne();
  }

  async getSessionByRefreshToken(
    refreshToken: string,
  ): Promise<Session | null> {
    return await AppDataSource.createQueryBuilder()
      .select('session')
      .from(Session, 'session')
      .where('session.refreshToken = :refreshToken', { refreshToken })
      .getOne();
  }

  async insertSession(payload: Session): Promise<Session | null> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(Session, payload);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
    const data = await this.getSessionByRefreshToken(payload.refreshToken);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  async deleteSessionByRefreshToken(refreshToken: string): Promise<boolean> {
    const newestSession = await this.getSessionByRefreshToken(refreshToken);

    try {
      await AppDataSource.createQueryBuilder()
        .softDelete()
        .from(Session, 'session')
        .where('session.id = :id', { id: newestSession?.id })
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }
}
