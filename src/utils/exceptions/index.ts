import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as express from 'express';
import { ERROR_CODE } from './const';

@Catch()
export class ExceptionsUtil implements ExceptionFilter {
  private logger = new Logger('EXCEPTION');
  catch(exception, host: ArgumentsHost) {
    if (typeof exception === 'object') {
      this.logger.log(JSON.stringify(exception));
    } else {
      this.logger.log(`${exception}`);
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as express.Response;
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.UNPROCESSABLE_ENTITY;

    const reason = { ...ERROR_CODE.UNKNOWN };
    switch (status) {
      case HttpStatus.BAD_REQUEST: {
        reason.error_code = ERROR_CODE.BAD_REQUEST.error_code;
        reason.message = exception.response.message;
        break;
      }
      case HttpStatus.NOT_FOUND: {
        reason.error_code = ERROR_CODE.NOT_FOUND.error_code;
        reason.message = exception.response.message;
        break;
      }
      default:
        if (exception.status) {
          status = exception.status;
          reason.error_code = exception.error_code;
          reason.message = exception.message;
        } else {
          reason.message = `${exception}`;
        }
        break;
    }
    response.status(status).json({
      ...reason,
    });
  }
}
