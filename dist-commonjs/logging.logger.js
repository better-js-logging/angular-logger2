"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sprintfjs = require("sprintf-js");
var sprintf = sprintfjs.sprintf;
var moment = require("moment");
var logging_types_1 = require("./logging.types");
var console_1 = require("./console");
var LoggerBase = (function () {
    function LoggerBase() {
    }
    LoggerBase.prototype.log = function (args, loggingFunc, level, context, config) {
        if (this.levelPassesThreshold(context, level, config)) {
            var enhancedArguments = this.enhanceLogline(args, context, level, config);
            loggingFunc.apply(null, enhancedArguments);
            return enhancedArguments; // return for testing purposes
        }
        else {
            return null; // no log produced
        }
    };
    LoggerBase.prototype.levelPassesThreshold = function (context, logLevel, config) {
        return logLevel.level > logging_types_1.LogLevel.OFF.level && logLevel.level <= this.getLogLevelThreshold(context, config).level;
    };
    LoggerBase.prototype.getLogLevelThreshold = function (context, config) {
        if (context) {
            var logLevelForContext = this.findLogLevelForContext(config.contextLogLevels, context);
            if (logLevelForContext) {
                return logLevelForContext.logLevel;
            }
            else if (context.indexOf('.') !== -1) {
                return this.getLogLevelThreshold(context.substring(0, context.lastIndexOf('.')), config);
            }
        }
        var catchAll = this.findLogLevelForContext(config.contextLogLevels, '*');
        return (catchAll && catchAll.logLevel) || logging_types_1.LogLevel.TRACE;
    };
    LoggerBase.prototype.findLogLevelForContext = function (contextLogLevels, context) {
        return contextLogLevels.find(function (c) { return c.context == context; });
    };
    LoggerBase.prototype.enhanceLogline = function (args, context, logLevel, config) {
        var prefix = this.generatePrefix(context, logLevel, config);
        var processedArgs = this.maybeApplySprintf([].slice.call(args));
        return [prefix].concat([].slice.call(processedArgs));
    };
    LoggerBase.prototype.maybeApplySprintf = function (args) {
        var sprintfAvailable = typeof sprintf !== 'undefined';
        var sprintfCandidate = sprintfAvailable && args.length >= 2 && typeof args[0] === 'string' && args[0].indexOf('%') !== -1;
        if (sprintfCandidate) {
            try {
                // apply sprintf with the proper arguments
                var placeholderCount = this.countSprintfHolders(args[0]);
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
    };
    LoggerBase.prototype.generatePrefix = function (context, level, config) {
        var dateStr = '';
        if (typeof moment !== 'undefined') {
            dateStr = moment().locale(config.datetimeLocale).format(config.datetimePattern);
        }
        else {
            var d = new Date();
            var timeStr = new Date().toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];
            dateStr = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + timeStr;
        }
        if (typeof sprintf !== 'undefined') {
            return sprintf(config.prefixPattern, dateStr, context, level.name.toLowerCase());
        }
        else {
            // use fixed layout: '%s::[%s]%s> '
            return dateStr + '::' + context + '::' + level.name.toLowerCase() + '> ';
        }
    };
    LoggerBase.prototype.countSprintfHolders = function (pattern) {
        var hasNamedHolders = /\x25\([a-zA-Z0-9_]+\)[b-fijosuxX]/.test(pattern);
        if (hasNamedHolders) {
            return 1;
        }
        var placeholderCounter = 0;
        function f(index) {
            // keep track of highest arg index, needed for single -but indexed- placeholders placeholder (ie. %6$s consumes the first 6 arguments)
            return function () { return placeholderCounter = Math.max(placeholderCounter, index); };
        }
        // this scary approach makes use of sprintf's function argument style, so we can check  how many arguments
        // sprintf is trying to fill in by calling our function f(). Then we know how many placeholders there are.
        sprintf(pattern, f(1), f(2), f(3), f(4), f(5), f(6), f(7), f(8), f(9), f(10));
        return placeholderCounter;
    };
    return LoggerBase;
}());
exports.LoggerBase = LoggerBase;
var Logger = (function (_super) {
    __extends(Logger, _super);
    function Logger(context, config) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.config = config;
        return _this;
    }
    Logger.prototype.trace = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, function () { Logger.console.trace.apply(Logger.console, arguments); }, logging_types_1.LogLevel.TRACE, this.context, this.config);
    };
    Logger.prototype.debug = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, function () { Logger.console.debug.apply(Logger.console, arguments); }, logging_types_1.LogLevel.DEBUG, this.context, this.config);
    };
    Logger.prototype.info = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, function () { Logger.console.info.apply(Logger.console, arguments); }, logging_types_1.LogLevel.INFO, this.context, this.config);
    };
    Logger.prototype.warn = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, function () { Logger.console.warn.apply(Logger.console, arguments); }, logging_types_1.LogLevel.WARN, this.context, this.config);
    };
    Logger.prototype.error = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, function () { Logger.console.error.apply(Logger.console, arguments); }, logging_types_1.LogLevel.ERROR, this.context, this.config);
    };
    return Logger;
}(LoggerBase));
Logger.console = console_1.default();
exports.Logger = Logger;
//# sourceMappingURL=logging.logger.js.map