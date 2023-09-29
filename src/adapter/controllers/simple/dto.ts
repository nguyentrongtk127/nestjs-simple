import {
  IsString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class SimplePostDtoReq {
  @ApiProperty({
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  description: string
}
export class SimplePostDtoRes {
  @ApiProperty({
    required: true,
  })
  @IsString()
  data: string
}
