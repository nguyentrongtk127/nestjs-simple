import { SimpleRepository } from 'src/infrastructure/data/database/simple.repository';
import { ICreateSimpleRes } from './type';
import { Inject } from '@nestjs/common';

export class SimpleService {
    constructor(
        @Inject(SimpleRepository)
        private simpleRepository: SimpleRepository,
    ) { }
    async create(param: ICreateSimpleRes): Promise<string> {
        // to do something
        const res = await this.simpleRepository.save(param)
        // to do something
        return res.id
    }
}
