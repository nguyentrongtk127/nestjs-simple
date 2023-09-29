import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';

export class DBContext {
  constructor(@InjectConnection() private connection: Connection) {}
  async runInTransaction(
    runInTransaction: (queryRunner: QueryRunner) => Promise<any>,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return await runInTransaction(queryRunner)
      .then(async (result) => {
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return result;
      })
      .catch(async (error) => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        throw error;
      });
  }
}
