import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ERROR_CODES } from '../errors/error-code';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : null;

    let errorCode =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any)?.errorCode
        : null;

    let message = ERROR_CODES.INTERNAL_SERVER_ERROR.INTERNAL_SERVER_ERROR;

    if (isHttpException) {
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any)?.message || exception.message;
      } else {
        message = exception.message;
      }
    }

    // Log error to console
    const logContext = `${request.method} ${request.url}`;
    if (status >= 500) {
      // Server errors: log full stack trace
      this.logger.error(
        `[${logContext}] ${status} - ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else if (status >= 400) {
      // Client errors: log warning level with details
      this.logger.warn(`[${logContext}] ${status} - ${message}`);
    } else {
      this.logger.log(`[${logContext}] ${status} - ${message}`);
    }

    response.status(status).json({
      statusCode: status,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
