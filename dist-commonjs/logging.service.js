"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var logging_types_1 = require("./logging.types");
var logging_logger_1 = require("./logging.logger");
var LoggingService = LoggingService_1 = (function () {
    function LoggingService(config) {
        this.config = config;
        console.debug('creating new LoggingService... got config injected:', config);
        this.config = new logging_types_1.LoggingConfig((config && config.prefixPattern) || LoggingService_1.DEFAULT_CONFIG.prefixPattern, (config && config.datetimePattern) || LoggingService_1.DEFAULT_CONFIG.datetimePattern, (config && config.datetimeLocale) || LoggingService_1.DEFAULT_CONFIG.datetimeLocale, (config && config.contextLogLevels) || LoggingService_1.DEFAULT_CONFIG.contextLogLevels);
    }
    /**
     * Convenience method to quickly retrieve a logger without going through Angular first (also missing out on default config provided through Angular).
     */
    LoggingService.getLogger = function (context, prefixPattern, datetimeLocale, datetimePattern, logLevel) {
        return new LoggingService_1().getLogger(context, prefixPattern, datetimeLocale, datetimePattern, logLevel);
    };
    LoggingService.prototype.getLogger = function (context, prefixPattern, datetimeLocale, datetimePattern, logLevel) {
        if (context === void 0) { context = this.createRandomName(); }
        return new logging_logger_1.Logger(context, new logging_types_1.LoggingConfig(prefixPattern || this.config.prefixPattern, datetimePattern || this.config.datetimePattern, datetimeLocale || this.config.datetimeLocale, (logLevel && [new logging_types_1.ContextLogLevel(context, logLevel)]) || this.config.contextLogLevels));
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
    return LoggingService;
}());
LoggingService.DEFAULT_CONFIG = new logging_types_1.LoggingConfig('%s::[%s]> ', 'LLL', window.navigator.language || 'en', [new logging_types_1.ContextLogLevel('*', logging_types_1.LogLevel.TRACE)]);
LoggingService = LoggingService_1 = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(logging_types_1.LoggingConfig)), __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [logging_types_1.LoggingConfig])
], LoggingService);
exports.LoggingService = LoggingService;
var LoggingService_1;
//# sourceMappingURL=logging.service.js.map