import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Render
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimplePostDtoReq, SimplePostDtoRes } from './dto';
import { SimpleService } from 'src/services/simple';

@ApiTags('public/simple')
@ApiBearerAuth()
@Controller(`api/v1/simple`)
export class SimpleController {
  constructor(
    @Inject(SimpleService) private simpleService: SimpleService
  ) { }
  @Post('/list')
  @ApiResponse({
    status: 200,
    description: 'Create simple',
    type: SimplePostDtoRes
  })
  async create(@Body() body: SimplePostDtoReq) {
    const result = await this.simpleService.create(body)
    return { data: result }
  }
  @Get('')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
