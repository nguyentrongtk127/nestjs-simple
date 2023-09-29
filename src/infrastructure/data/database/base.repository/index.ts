import {
  BaseEntity,
  DeleteResult,
  Repository,
  getRepository,
  QueryRunner,
} from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseRepository } from './types';

export class BaseRepository<T> implements IBaseRepository<T> {
  repo(): Repository<any> {
    return getRepository(BaseEntity);
  }
  async findOne(params: T): Promise<T> {
    return this.repo().findOne({
      where: params,
      order: { created_at: 'DESC' },
    });
  }

  async find(params: T): Promise<T[]> {
    return this.repo().find({ where: params, order: { created_at: 'DESC' } });
  }

  async findById(id: EntityId): Promise<T> {
    return this.repo().findOne(id);
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repo().findByIds(ids);
  }

  async save(params: T | T[], queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      const transaction = await this.repo().create(params);
      return queryRunner.manager.save(transaction);
    } else {
      return this.repo().save(params);
    }
  }

  async deleteById(
    id: EntityId,
    queryRunner?: QueryRunner,
  ): Promise<DeleteResult> {
    return this.repo().delete(id);
  }
  async deleteMultipleByIds(
    ids: EntityId[],
    queryRunner?: QueryRunner,
  ): Promise<DeleteResult> {
    return this.repo().delete(ids);
  }
  async delete(params: T, queryRunner?: QueryRunner): Promise<DeleteResult> {
    return this.repo().delete(params);
  }
  async count(params: T): Promise<number> {
    return this.repo().count(params);
  }

  async softDeleteById(
    id: EntityId,
    userId?: string,
    queryRunner?: QueryRunner,
  ): Promise<T> {
    const data = { id, deleted_at: Date.now(), updated_by: userId };
    if (queryRunner) {
      const transaction = await this.repo().create(data);
      return queryRunner.manager.save(transaction);
    } else {
      return this.repo().save(data);
    }
  }
  async softDeleteMultipleByIds(
    ids: EntityId[],
    userId?: string,
    queryRunner?: QueryRunner,
  ): Promise<T[]> {
    const data = ids.map((id) => {
      return { id, deleted_at: Date.now(), updated_by: userId };
    });
    if (queryRunner) {
      const transaction = await this.repo().create(data);
      return queryRunner.manager.save(transaction);
    } else {
      return this.repo().save(data);
    }
  }
}
