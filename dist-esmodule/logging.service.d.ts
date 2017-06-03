import { LoggingConfig, LogLevel } from "./logging.types";
import { Logger } from "./logging.logger";
export declare class LoggingService {
    private readonly config;
    private static readonly DEFAULT_CONFIG;
    /**
     * Convenience method to quickly retrieve a logger without going through Angular first (also missing out on default config provided through Angular).
     */
    static getLogger(context?: string, prefixPattern?: string, datetimeLocale?: string, datetimePattern?: string, logLevel?: LogLevel): Logger;
    constructor(config?: LoggingConfig);
    getLogger(context?: string, prefixPattern?: string, datetimeLocale?: string, datetimePattern?: string, logLevel?: LogLevel): Logger;
    private createRandomName();
    /**
     * Updated version of: https://j11y.io/javascript/random-word-generator/
     */
    private createRandomWord(length);
}
