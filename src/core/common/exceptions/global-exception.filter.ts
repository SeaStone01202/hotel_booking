import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;

    const errorCode = exceptionResponse?.errorCode;

    response.status(status).json({
      statusCode: status,
      message: errorCode || exception.message,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
