import { DynamicModule } from '@nestjs/common';

import { TargetPinoConfiguration } from './interfaces/log-configuration.interface';

import { LoggerModule } from 'nestjs-pino';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuid } from 'uuid';
import { LogService } from './log-service.service';
import { ConfigLog } from './interfaces/config-log-module.interface';

export class LogModule {
  static forRoot(configLog?: ConfigLog): DynamicModule {
    const targetsPinoLogger: TargetPinoConfiguration[] = [];

    targetsPinoLogger.push({
      target: 'pino-elasticsearch',
      level: 'info',
      options: {
        node: configLog.kibanaHost,
        index: configLog.indexKibana,
        auth: configLog.auth ? 'username' in configLog.auth ? { username: configLog.auth.username, password: configLog.auth.password } : { apiKey: configLog.auth.apiKey } : undefined
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
        LoggerModule.forRoot({
          pinoHttp: {
            transport: {
              targets: targetsPinoLogger,
            },
            timestamp: configLog.timestamp,
          },
        }),
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            generateId: true,
            idGenerator: () => uuid(),
          },
        }),
      ],
      providers: [LogService],
      exports: [LogService],
    };
  }
}
