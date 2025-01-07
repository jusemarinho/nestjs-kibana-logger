export interface LogConfiguration {
  pinoHttpConfiguration: TargetPinoConfiguration;
}

export interface TargetPinoConfiguration {
  target: string;
  level?: string;
  options?: Record<string, any>;
}
