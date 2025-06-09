import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LogService extends Logger {
  constructor(
    pinoLogger: PinoLogger,
    @Inject(ClsService) private readonly cls: ClsService,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
  ) {
    super(pinoLogger, params);
  }

  public log(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    // If message is not an object, log it directly
    // with the traceId
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    // Use super.log to ensure the message is logged correctly
    // with the traceId and any optional parameters
    // This ensures that the message is always an object
    // and includes the traceId
    // This is important for structured logging
    super.log({ message: message, traceId: traceId }, ...optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    // If message is not an object, log it directly
    // with the traceId
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    // Use super.debug to ensure the message is logged correctly
    // with the traceId
    // and any optional parameters
    // This ensures that the message is always an object
    // and includes the traceId
    super.debug({ message: message, traceId: traceId }, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    // If message is not an object, log it directly
    // with the traceId
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    // Use super.warn to ensure the message is logged correctly
    // with the traceId and any optional parameters
    // This ensures that the message is always an object
    // and includes the traceId
    super.warn({ message: message, traceId: traceId }, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    // If message is not an object, log it directly
    // with the traceId
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    // Use super.error to ensure the message is logged correctly
    // with the traceId and any optional parameters
    // This ensures that the message is always an object
    // and includes the traceId
    // This is important for structured logging
    super.error({ message: message, traceId: traceId }, ...optionalParams);
  }
}
