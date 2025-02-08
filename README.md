<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) A NestJS library for structured logging with Kibana integration using pino-elasticsearch.

## Installation

```bash
$ npm install @josemarinho/nestjs-kibana-logger
```

## Running the app

Once the installation process is complete, we can import the LogModule into the root AppModule.

```ts

import { Module } from '@nestjs/common';
import { LogModule } from '@josemarinho/nestjs-kibana-logger';

@Module({
  imports: [
    LogModule.forRoot({
      kibanaHost: 'kibana-host',
      indexKibana: 'index-kibana'
    }),
  ],
  ...
})
export class AppModule {}

```

If you use Basic Authentication with `username` and `password` or with `ApiKey`, you can add it to the configuration.

#### Only use one or the other authentication

```ts

import { Module } from '@nestjs/common';
import { LogModule } from '@josemarinho/nestjs-kibana-logger';

@Module({
  imports: [
    LogModule.forRoot({
      kibanaHost: 'elasticsearch-host',
      indexKibana: 'index-kibana',
      auth: {
        username: 'elasticsearch-user',
        password: 'elasticsearch-password',
        apiKey: 'api-key'
      },
    }),
  ],
  ...
})
export class AppModule {}

```


### Integrating the Log Service in `main.ts`

To utilize the custom logging functionality provided by your library, the Log service is set as the logger for the NestJS application. Here’s a breakdown:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from '@josemarinho/nestjs-kibana-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LogService));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## Utilization

The AppService class demonstrates how to use the built-in Logger from NestJS for logging.

```ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  doSomething(): void {  
    this.logger.log('This is a log message');       // Standard log message  
    this.logger.warn('This is a warning message'); // Warning message  
    this.logger.error('This is an error message'); // Error message  
  }  
}

```

After your app it's ready to running.