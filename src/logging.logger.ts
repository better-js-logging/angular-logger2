import sprintf from "sprintf-js";
import * as moment from "moment";
import {ContextLogLevel, LoggingConfig, LogLevel} from "./logging.types";
import requireConsole from "./console";

class LoggerBase {
    protected log(loggingFunc, level: LogLevel, context, config): Array<any> {
        config.logLevels = config.logLevels || [];
        if (this.levelPassesThreshold(context, level, config)) {
            const enhancedArguments = this.enhanceLogline(arguments, context, level, config.datetimePattern, config.datetimeLocale, config.prefixPattern);
            loggingFunc.apply(null, enhancedArguments);
            return enhancedArguments; // return for testing purposes
        }
        else {
            return null; // no log produced
        }
    };
    
    private levelPassesThreshold(context, level, config): boolean {
        return level > LogLevel.OFF.level && level <= this.getLogLevelThreshold(context, config);
    }
    
    private getLogLevelThreshold(context: string, config: LoggingConfig): LogLevel {
        if (context) {
            const logLevelForContext: ContextLogLevel = this.findLogLevelForContext(config.contextLogLevels, context);
            if (logLevelForContext) {
                return logLevelForContext.logLevel;
            } else if (context.indexOf('.') !== -1) {
                return this.getLogLevelThreshold(context.substring(0, context.lastIndexOf('.')), config);
            }
        }
        const catchAll: ContextLogLevel = this.findLogLevelForContext(config.contextLogLevels, '*');
        return (catchAll && catchAll.logLevel) || LogLevel.TRACE;
    }
    
    private findLogLevelForContext(contextLogLevels: Array<ContextLogLevel>, context: string): ContextLogLevel {
        return contextLogLevels.find((c: ContextLogLevel) => c.context == context);
    }
    
    private enhanceLogline(args, context: string, level: LogLevel, datetimePattern: string, datetimeLocale: string, prefixPattern: string) {
        const prefix = this.generatePrefix(context, level, datetimePattern, datetimeLocale, prefixPattern);
        const processedArgs = maybeApplySprintf([].slice.call(args));
        return [prefix].concat([].slice.call(processedArgs));
        
        function maybeApplySprintf(args) {
            const sprintfAvailable: boolean = typeof sprintf !== 'undefined';
            const sprintfCandidate = sprintfAvailable && args.length >= 2 && typeof args[0] === 'string' && args[0].indexOf('%') !== -1;
            if (sprintfCandidate) {
                try {
                    // apply sprintf with the proper arguments
                    const placeholderCount = this.countSprintfHolders(args[0]);
                    if (placeholderCount > 0) {
                        args[0] = sprintf.apply(null, args);
                        args.splice(1, placeholderCount); // remove arguments consumed by sprintf
                    }
                }
                catch (e) {
                    // invalid arguments passed into sprintf, continue without applying
                    args.unshift(e);
                }
            }
            
            return args;
        }
    }
    
    private generatePrefix(context: string, level: LogLevel, datetimePattern: string, datetimeLocale: string, prefixPattern: string) {
        let dateStr: string = '';
        if (typeof moment !== 'undefined') {
            dateStr = moment().locale(datetimeLocale).format(datetimePattern);
        } else {
            const d: Date = new Date();
            const timeStr: string = new Date().toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];
            dateStr = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + timeStr;
        }
        
        if (typeof sprintf !== 'undefined') {
            return sprintf(prefixPattern, dateStr, context, level.name.toLowerCase());
        } else {
            // use fixed layout: '%s::[%s]%s> '
            return dateStr + '::' + context + '::' + level.name.toLowerCase() + '> ';
        }
    }
    
    private countSprintfHolders = function (pattern) {
        const hasNamedHolders = /\x25\([a-zA-Z0-9_]+\)[b-fijosuxX]/.test(pattern);
        if (hasNamedHolders) {
            return 1;
        }
        
        let placeholderCounter = 0;
        
        function f(index) {
            return function () {
                // keep track of highest arg index, needed for single -but indexed- placeholders placeholder (ie. %6$s consumes the first 6 arguments)
                placeholderCounter = Math.max(placeholderCounter, index);
            };
        }
        
        sprintf(pattern, f(1), f(2), f(3), f(4), f(5), f(6), f(7), f(8), f(9), f(10));
        return placeholderCounter;
    };
}

export class Logger extends LoggerBase {
    
    private static console: { log, info, debug, warn, error } = requireConsole();
    
    constructor(private readonly context: string,
                private readonly config: LoggingConfig) {
        super();
    }
    
    readonly trace: (message?:any, ...rest: any[]) => Array<any> = () => this.log(Logger.console.debug, LogLevel.DEBUG, this.context, this.config);
    readonly debug: (...rest: any[]) => Array<any> = () => this.log(Logger.console.debug, LogLevel.DEBUG, this.context, this.config);
    readonly info: (...rest: any[]) => Array<any> = () => this.log(Logger.console.info, LogLevel.INFO, this.context, this.config);
    readonly warn: (...rest: any[]) => Array<any> = () => this.log(Logger.console.warn, LogLevel.WARN, this.context, this.config);
    readonly error: (...rest: any[]) => Array<any> = () => this.log(Logger.console.error, LogLevel.ERROR, this.context, this.config);
}