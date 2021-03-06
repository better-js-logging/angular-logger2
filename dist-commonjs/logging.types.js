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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoggingConfig = /** @class */ (function () {
    function LoggingConfig(prefixPattern, datetimePattern, datetimeLocale, contextLogLevels) {
        this.prefixPattern = prefixPattern;
        this.datetimePattern = datetimePattern;
        this.datetimeLocale = datetimeLocale;
        this.contextLogLevels = contextLogLevels;
    }
    LoggingConfig = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [String, String, String, Array])
    ], LoggingConfig);
    return LoggingConfig;
}());
exports.LoggingConfig = LoggingConfig;
var LogLevel = /** @class */ (function () {
    function LogLevel(name, level) {
        this.name = name;
        this.level = level;
    }
    LogLevel.TRACE = new LogLevel('TRACE', 4);
    LogLevel.DEBUG = new LogLevel('DEBUG', 3);
    LogLevel.INFO = new LogLevel('INFO', 2);
    LogLevel.WARN = new LogLevel('WARN', 1);
    LogLevel.ERROR = new LogLevel('ERROR', 0);
    LogLevel.OFF = new LogLevel('OFF', -1);
    return LogLevel;
}());
exports.LogLevel = LogLevel;
var ContextLogLevel = /** @class */ (function () {
    function ContextLogLevel(context, logLevel) {
        this.context = context;
        this.logLevel = logLevel;
    }
    return ContextLogLevel;
}());
exports.ContextLogLevel = ContextLogLevel;
//# sourceMappingURL=logging.types.js.map