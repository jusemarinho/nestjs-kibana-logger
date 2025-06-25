type TimeFn = () => string;

export interface ConfigLog {
    kibanaHost: string;
    indexKibana: string;
    auth?: AuthBasic | AuthKey;
    timestamp?: TimeFn | boolean;
    traceIdHeaderName?: string
    autoLogging?: boolean;
    base?: Record<string, any>;
}

export interface AuthBasic {
    username: string;
    password: string;
}

export interface AuthKey {
    apiKey: string
}