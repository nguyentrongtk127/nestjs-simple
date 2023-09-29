import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_CONFIG } from 'src/config';
import { BaseRepository } from './base.repository';
import { DBContext } from './db-context';
import { SimpleRepository } from './simple.repository';
import {
  SimpleEntity,
  SimpleEntitySubscriber,
} from './simple.repository/simple.entity';
const repo = [
  DBContext,
  BaseRepository,
  SimpleRepository,
];
const entities = [
  SimpleEntity,
];
const subscribers = [
  SimpleEntitySubscriber
];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: APP_CONFIG.POSTGRES_HOST,
      port: APP_CONFIG.POSTGRES_PORT,
      username: APP_CONFIG.POSTGRES_USER,
      password: APP_CONFIG.POSTGRES_PASS,
      database: APP_CONFIG.POSTGRES_DB,
      entities,
      subscribers,
      synchronize: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
      keepConnectionAlive: true,
    }),
  ],
  providers: repo,
  exports: repo,
})
export class DatabaseModule {}
