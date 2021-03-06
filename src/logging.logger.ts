import * as sprintfjs from 'sprintf-js';
const sprintf = sprintfjs.sprintf;
import * as moment from 'moment';
import {ContextLogLevel, LoggingConfig, LogLevel} from './logging.types';
import requireConsole from './console';

export class LoggerBase {
    protected log(args: IArguments, loggingFunc, level: LogLevel, context, config): Array<any> {
        if (this.levelPassesThreshold(context, level, config)) {
            const enhancedArguments = this.enhanceLogline(args, context, level, config);
            loggingFunc.apply(null, enhancedArguments);
            return enhancedArguments; // return for testing purposes
        } else {
            return null; // no log produced
        }
    }
    
    private levelPassesThreshold(context: string, logLevel: LogLevel, config: LoggingConfig): boolean {
        return logLevel.level > LogLevel.OFF.level && logLevel.level <= this.getLogLevelThreshold(context, config).level;
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
    
    private enhanceLogline(args, context: string, logLevel: LogLevel, config: LoggingConfig) {
        const prefix = this.generatePrefix(context, logLevel, config);
        const processedArgs = this.maybeApplySprintf([].slice.call(args));
        return [prefix].concat([].slice.call(processedArgs));
    }
    
    private maybeApplySprintf(args: any[]) {
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
            } catch (e) {
                // invalid arguments passed into sprintf, continue without applying
                args.unshift(e);
            }
        }
        
        return args;
    }
    
    private generatePrefix(context: string, level: LogLevel, config: LoggingConfig) {
        let dateStr: string = '';
        if (typeof moment !== 'undefined') {
            dateStr = moment().locale(config.datetimeLocale).format(config.datetimePattern);
        } else {
            const d: Date = new Date();
            const timeStr: string = new Date().toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];
            dateStr = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + timeStr;
        }
        
        if (typeof sprintf !== 'undefined') {
            return sprintf(config.prefixPattern, dateStr, context, level.name.toLowerCase());
        } else {
            // use fixed layout: '%s::[%s]%s> '
            return dateStr + '::' + context + '::' + level.name.toLowerCase() + '> ';
        }
    }
    
    private countSprintfHolders(pattern: string) {
        const hasNamedHolders = /\x25\([a-zA-Z0-9_]+\)[b-fijosuxX]/.test(pattern);
        if (hasNamedHolders) {
            return 1;
        }
        
        let placeholderCounter = 0;
        
        function f(index: number) {
            // keep track of highest arg index, needed for single -but indexed- placeholders placeholder (ie. %6$s consumes the first 6 arguments)
            return (): any => placeholderCounter = Math.max(placeholderCounter, index);
        }
        
        // this scary approach makes use of sprintf's function argument style, so we can check  how many arguments
        // sprintf is trying to fill in by calling our function f(). Then we know how many placeholders there are.
        sprintf(pattern, f(1), f(2), f(3), f(4), f(5), f(6), f(7), f(8), f(9), f(10));
        return placeholderCounter;
    }
}

export class Logger extends LoggerBase {
    
    private static console: { trace, debug, info, warn, error } = requireConsole();
    
    constructor(private readonly context: string,
                private readonly config: LoggingConfig) {
        super();
    }
    
    trace(message?: any, ...rest: any[]): Array<any> {
        return this.log(arguments, function() { Logger.console.trace.apply(Logger.console, arguments) }, LogLevel.TRACE, this.context, this.config);
    }
    
    debug(message?: any, ...rest: any[]): Array<any> {
        return this.log(arguments, function() { Logger.console.debug.apply(Logger.console, arguments) }, LogLevel.DEBUG, this.context, this.config);
    }
    
    info(message?: any, ...rest: any[]): Array<any> {
        return this.log(arguments, function() { Logger.console.info.apply(Logger.console, arguments) }, LogLevel.INFO, this.context, this.config);
    }
    
    warn(message?: any, ...rest: any[]): Array<any> {
        return this.log(arguments, function() { Logger.console.warn.apply(Logger.console, arguments) }, LogLevel.WARN, this.context, this.config);
    }
    
    error(message?: any, ...rest: any[]): Array<any> {
        return this.log(arguments, function() { Logger.console.error.apply(Logger.console, arguments) }, LogLevel.ERROR, this.context, this.config);
    }
}