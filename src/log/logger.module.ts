// logger.module.ts
import { DynamicModule } from '@nestjs/common';
import { TargetPinoConfiguration } from './interfaces/log-configuration.interface';
import { LoggerModule } from 'nestjs-pino';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuid } from 'uuid';
import { LogService } from './log-service.service';
import { ConfigLog } from './interfaces/config-log-module.interface';
import { Request } from 'express';
import { ElasticsearchHealthIndicator } from './elasticsearch.health';
import { HealthIndicatorService, TerminusModule } from '@nestjs/terminus';

export const CONFIG_LOG = Symbol('CONFIG_LOG');

export class LogModule {
  static forRoot(configLog: ConfigLog): DynamicModule {
    const targetsPinoLogger: TargetPinoConfiguration[] = [];

    targetsPinoLogger.push({
      target: 'pino-elasticsearch',
      level: 'info',
      options: {
        node: configLog.kibanaHost,
        index: configLog.indexKibana,
        auth:
          configLog.auth
            ? 'username' in configLog.auth
              ? {
                username: configLog.auth.username,
                password: configLog.auth.password,
              }
              : { apiKey: configLog.auth.apiKey }
            : undefined,
      },
    });

    targetsPinoLogger.push({
      target: 'pino/file',
      options: { destinarion: 1 },
    });

    return {
      module: LogModule,
      global: true,
      imports: [
        TerminusModule,
        LoggerModule.forRoot({
          pinoHttp: {
            transport: {
              targets: targetsPinoLogger,
            },
            base: configLog.base,
            timestamp: configLog.timestamp,
            autoLogging: configLog.autoLogging,
          },
        }),
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            generateId: true,
            idGenerator: (req: Request): string => {
              const traceId = req.headers[configLog.traceIdHeaderName ?? 'x-trace-id'];
              return Array.isArray(traceId) ? traceId[0] : traceId || uuid();
            },
          },
        }),
      ],
      providers: [
        LogService,
        {
          provide: CONFIG_LOG,
          useValue: configLog,
        },
        {
          provide: ElasticsearchHealthIndicator,
          useFactory: (healthIndicatorService, configLogInjected: ConfigLog) => new ElasticsearchHealthIndicator(healthIndicatorService, configLogInjected),
          inject: [HealthIndicatorService, CONFIG_LOG],
        },
      ],
      exports: [LogService, ElasticsearchHealthIndicator],
    };
  }
}