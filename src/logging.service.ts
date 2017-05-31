import {Inject, Injectable, Optional} from "@angular/core";
import {ContextLogLevel, LoggingConfig, LogLevel} from "./logging.types";
import {Logger} from "./logging.logger";

@Injectable()
export class LoggingService {
    private static readonly DEFAULT_CONFIG: LoggingConfig = new LoggingConfig(
        '%s::[%s]> ',
        window.navigator.language || 'en',
        'LLL',
        [new ContextLogLevel('*', LogLevel.TRACE)]
    );
    
    
    constructor(@Inject('loggingConfig') @Optional() private readonly config?: LoggingConfig) {
        this.config = new LoggingConfig(
            config.prefixPattern || LoggingService.DEFAULT_CONFIG.prefixPattern,
            config.datetimePattern || LoggingService.DEFAULT_CONFIG.datetimePattern,
            config.datetimeLocale || LoggingService.DEFAULT_CONFIG.datetimeLocale,
            config.contextLogLevels || LoggingService.DEFAULT_CONFIG.contextLogLevels);
    }
    
    
    getLogger(context: string, prefixPattern?: string, datetimeLocale?: string, datetimePattern?: string, logLevel?: LogLevel): Logger {
        return new Logger(context, new LoggingConfig(
            prefixPattern || this.config.prefixPattern,
            datetimePattern || this.config.datetimePattern,
            datetimeLocale || this.config.datetimeLocale,
            (logLevel && [new ContextLogLevel(context, logLevel)]) || this.config.contextLogLevels));
    }
}
