import { LoggingConfig, LogLevel } from './logging.types';
export declare class LoggerBase {
    protected log(args: IArguments, loggingFunc: any, level: LogLevel, context: any, config: any): Array<any>;
    private levelPassesThreshold;
    private getLogLevelThreshold;
    private findLogLevelForContext;
    private enhanceLogline;
    private maybeApplySprintf;
    private generatePrefix;
    private countSprintfHolders;
}
export declare class Logger extends LoggerBase {
    private readonly context;
    private readonly config;
    private static console;
    constructor(context: string, config: LoggingConfig);
    trace(message?: any, ...rest: any[]): Array<any>;
    debug(message?: any, ...rest: any[]): Array<any>;
    info(message?: any, ...rest: any[]): Array<any>;
    warn(message?: any, ...rest: any[]): Array<any>;
    error(message?: any, ...rest: any[]): Array<any>;
}
