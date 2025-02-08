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
    super.log({ message: message, traceId: traceId }, ...optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    super.debug({ message: message, traceId: traceId }, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    super.warn({ message: message, traceId: traceId }, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    const traceId = this.cls.getId();
    super.error({ message: message, traceId: traceId }, ...optionalParams);
  }
}
