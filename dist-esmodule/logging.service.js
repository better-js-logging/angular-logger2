var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, Optional } from '@angular/core';
import { ContextLogLevel, LoggingConfig, LogLevel } from './logging.types';
import { Logger } from './logging.logger';
var LoggingService = /** @class */ (function () {
    function LoggingService(config) {
        this.config = config;
        if (config && typeof (console) !== 'undefined' && console && console.debug) {
            console.debug('creating new LoggingService with injected config:', config);
        }
        this.config = new LoggingConfig((config && config.prefixPattern) || LoggingService_1.DEFAULT_CONFIG.prefixPattern, (config && config.datetimePattern) || LoggingService_1.DEFAULT_CONFIG.datetimePattern, (config && config.datetimeLocale) || LoggingService_1.DEFAULT_CONFIG.datetimeLocale, (config && config.contextLogLevels) || LoggingService_1.DEFAULT_CONFIG.contextLogLevels);
    }
    LoggingService_1 = LoggingService;
    /**
     * Convenience method to quickly retrieve a logger without going through Angular first (also missing out on default config provided through Angular).
     */
    LoggingService.getLogger = function (context, prefixPattern, datetimeLocale, datetimePattern, logLevel) {
        return new LoggingService_1().getLogger(context, prefixPattern, datetimeLocale, datetimePattern, logLevel);
    };
    LoggingService.prototype.getLogger = function (context, prefixPattern, datetimeLocale, datetimePattern, logLevel) {
        if (context === void 0) { context = this.createRandomName(); }
        return new Logger(context, new LoggingConfig(prefixPattern || this.config.prefixPattern, datetimePattern || this.config.datetimePattern, datetimeLocale || this.config.datetimeLocale, (logLevel && [new ContextLogLevel(context, logLevel)]) || this.config.contextLogLevels));
    };
    LoggingService.prototype.createRandomName = function () {
        return this.createRandomWord(5) + ' ' + this.createRandomWord(5);
    };
    /**
     * Updated version of: https://j11y.io/javascript/random-word-generator/
     */
    LoggingService.prototype.createRandomWord = function (length) {
        var consonants = 'bcdfghjklmnpqrstvwxyz'.split('');
        var vowels = 'aeiou'.split('');
        var rand = function (limit) { return Math.floor(Math.random() * limit); };
        var word = '';
        for (var i = 0; i < length / 2; i++) {
            var randConsonant = consonants[rand(consonants.length)];
            var randVowel = vowels[rand(vowels.length)];
            word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
            word += i * 2 < length - 1 ? randVowel : '';
        }
        return word;
    };
    var LoggingService_1;
    LoggingService.DEFAULT_CONFIG = new LoggingConfig('%s::[%s]> ', 'LLL', window.navigator.language || 'en', [new ContextLogLevel('*', LogLevel.TRACE)]);
    LoggingService = LoggingService_1 = __decorate([
        Injectable(),
        __param(0, Inject(LoggingConfig)), __param(0, Optional()),
        __metadata("design:paramtypes", [LoggingConfig])
    ], LoggingService);
    return LoggingService;
}());
export { LoggingService };
//# sourceMappingURL=logging.service.js.map