import { Injectable, Inject } from '@nestjs/common';
import { HealthIndicatorService, HealthIndicatorResult } from '@nestjs/terminus';
import axios from 'axios';
import { ConfigLog } from './interfaces/config-log-module.interface';
import { CONFIG_LOG } from './logger.module';

@Injectable()
export class ElasticsearchHealthIndicator {
  constructor(
    private readonly health: HealthIndicatorService,
    @Inject(CONFIG_LOG) private readonly configLog: ConfigLog,
  ) { }

  async pingCheck<Key extends string = string>(
    key: Key,
  ): Promise<HealthIndicatorResult<Key>> {
    const indicator = this.health.check(key);

    const auth = this.configLog.auth
      ? 'username' in this.configLog.auth
        ? {
          auth: {
            username: this.configLog.auth.username,
            password: this.configLog.auth.password,
          },
        }
        : {
          headers: {
            Authorization: `ApiKey ${this.configLog.auth.apiKey}`,
          },
        }
      : {};

    try {
      await axios.get(this.configLog.kibanaHost, {
        timeout: 3000,
        validateStatus: (status) => status < 400,
        ...auth,
      });

      return indicator.up();
    } catch (error) {
      return indicator.down(`Elasticsearch check failed: ${error.message}`);
    }
  }
}