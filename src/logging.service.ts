import {Inject, Injectable, Optional} from "@angular/core";
import {ContextLogLevel, LoggingConfig, LogLevel} from "./logging.types";
import {Logger} from "./logging.logger";

@Injectable()
export class LoggingService {
    private static readonly DEFAULT_CONFIG: LoggingConfig = new LoggingConfig(
        '%s::[%s]> ',
        'LLL',
        window.navigator.language || 'en',
        [new ContextLogLevel('*', LogLevel.TRACE)]
    );
    
    /**
     * Convenience method to quickly retrieve a logger without going through Angular first (also missing out on default config provided through Angular).
     */
    static getLogger(context?: string, prefixPattern?: string, datetimeLocale?: string, datetimePattern?: string, logLevel?: LogLevel): Logger {
        return new LoggingService().getLogger(context, prefixPattern, datetimeLocale, datetimePattern, logLevel);
    }
    
    constructor(@Inject(LoggingConfig) @Optional() private readonly config?: LoggingConfig) {
        console.debug('creating new LoggingService... got config injected:', config);
        this.config = new LoggingConfig(
            (config && config.prefixPattern) || LoggingService.DEFAULT_CONFIG.prefixPattern,
            (config && config.datetimePattern) || LoggingService.DEFAULT_CONFIG.datetimePattern,
            (config && config.datetimeLocale) || LoggingService.DEFAULT_CONFIG.datetimeLocale,
            (config && config.contextLogLevels) || LoggingService.DEFAULT_CONFIG.contextLogLevels);
    }
    
    getLogger(context: string = this.createRandomName(), prefixPattern?: string, datetimeLocale?: string, datetimePattern?: string, logLevel?: LogLevel): Logger {
        return new Logger(context, new LoggingConfig(
            prefixPattern || this.config.prefixPattern,
            datetimePattern || this.config.datetimePattern,
            datetimeLocale || this.config.datetimeLocale,
            (logLevel && [new ContextLogLevel(context, logLevel)]) || this.config.contextLogLevels));
    }
    
    private createRandomName(): string {
        return this.createRandomWord(5) + ' ' + this.createRandomWord(5);
    }
    
    /**
     * Updated version of: https://j11y.io/javascript/random-word-generator/
     */
    private createRandomWord(length: number): string {
        const consonants: string[] = 'bcdfghjklmnpqrstvwxyz'.split('');
        const vowels: string[] = 'aeiou'.split('');
        const rand: (number) => number = (limit) => Math.floor(Math.random() * limit);
        let word = '';
        for (let i = 0; i < length / 2; i++) {
            const randConsonant = consonants[rand(consonants.length)];
            const randVowel = vowels[rand(vowels.length)];
            word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
            word += i * 2 < length - 1 ? randVowel : '';
        }
        return word;
    }
}
