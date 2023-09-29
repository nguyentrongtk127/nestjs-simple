import { Repository, getRepository } from 'typeorm';
import { BaseRepository } from '../base.repository';
import { SimpleEntity } from './simple.entity';

export class SimpleRepository extends BaseRepository<SimpleEntity> {
  repo(): Repository<SimpleEntity> {
    return getRepository(SimpleEntity);
  }
}
