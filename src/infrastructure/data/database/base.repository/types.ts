import { DeleteResult, QueryRunner } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export interface IBaseRepository<T> {
  findOne(params: T): Promise<T>;
  find(params: T): Promise<T[]>;
  findById(id: EntityId): Promise<T>;
  findByIds(ids: [EntityId]): Promise<T[]>;
  save(params: T): Promise<T>;
  delete(params: T, queryRunner?: QueryRunner): Promise<DeleteResult>;
  deleteById(id: EntityId, queryRunner?: QueryRunner): Promise<DeleteResult>;
  deleteMultipleByIds(
    ids: EntityId[],
    queryRunner?: QueryRunner,
  ): Promise<DeleteResult>;
  count(params: T): Promise<number>;

  softDeleteById(
    id: EntityId,
    userId?: string,
    queryRunner?: QueryRunner,
  ): Promise<T>;
  softDeleteMultipleByIds(
    ids: EntityId[],
    userId?: string,
    queryRunner?: QueryRunner,
  ): Promise<T[]>;
}
