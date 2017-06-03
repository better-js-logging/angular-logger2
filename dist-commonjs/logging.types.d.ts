export declare class LoggingConfig {
    prefixPattern: string;
    datetimePattern: string;
    datetimeLocale: string;
    contextLogLevels: Array<ContextLogLevel>;
    constructor(prefixPattern?: string, datetimePattern?: string, datetimeLocale?: string, contextLogLevels?: Array<ContextLogLevel>);
}
export declare class LogLevel {
    readonly name: string;
    readonly level: number;
    static TRACE: LogLevel;
    static DEBUG: LogLevel;
    static INFO: LogLevel;
    static WARN: LogLevel;
    static ERROR: LogLevel;
    static OFF: LogLevel;
    constructor(name: string, level: number);
}
export declare class ContextLogLevel {
    readonly context: string;
    readonly logLevel: LogLevel;
    constructor(context: string, logLevel: LogLevel);
}
