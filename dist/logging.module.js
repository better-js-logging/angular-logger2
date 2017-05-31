/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = @angular/core;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoggingConfig = (function () {
    function LoggingConfig(prefixPattern, datetimePattern, datetimeLocale, contextLogLevels) {
        this.prefixPattern = prefixPattern;
        this.datetimePattern = datetimePattern;
        this.datetimeLocale = datetimeLocale;
        this.contextLogLevels = contextLogLevels;
    }
    return LoggingConfig;
}());
exports.LoggingConfig = LoggingConfig;
var LogLevel = (function () {
    function LogLevel(name, level) {
        this.name = name;
        this.level = level;
    }
    return LogLevel;
}());
LogLevel.TRACE = new LogLevel('TRACE', 4);
LogLevel.DEBUG = new LogLevel('DEBUG', 3);
LogLevel.INFO = new LogLevel('INFO', 2);
LogLevel.WARN = new LogLevel('WARN', 1);
LogLevel.ERROR = new LogLevel('ERROR', 0);
LogLevel.OFF = new LogLevel('OFF', -1);
exports.LogLevel = LogLevel;
var ContextLogLevel = (function () {
    function ContextLogLevel(context, logLevel) {
        this.context = context;
        this.logLevel = logLevel;
    }
    return ContextLogLevel;
}());
exports.ContextLogLevel = ContextLogLevel;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var logging_types_1 = __webpack_require__(1);
var logging_logger_1 = __webpack_require__(4);
var LoggingService = LoggingService_1 = (function () {
    function LoggingService(config) {
        this.config = config;
        this.config = new logging_types_1.LoggingConfig(config.prefixPattern || LoggingService_1.DEFAULT_CONFIG.prefixPattern, config.datetimePattern || LoggingService_1.DEFAULT_CONFIG.datetimePattern, config.datetimeLocale || LoggingService_1.DEFAULT_CONFIG.datetimeLocale, config.contextLogLevels || LoggingService_1.DEFAULT_CONFIG.contextLogLevels);
    }
    LoggingService.prototype.getLogger = function (context, prefixPattern, datetimeLocale, datetimePattern, logLevel) {
        return new logging_logger_1.Logger(context, new logging_types_1.LoggingConfig(prefixPattern || this.config.prefixPattern, datetimePattern || this.config.datetimePattern, datetimeLocale || this.config.datetimeLocale, (logLevel && [new logging_types_1.ContextLogLevel(context, logLevel)]) || this.config.contextLogLevels));
    };
    return LoggingService;
}());
LoggingService.DEFAULT_CONFIG = new logging_types_1.LoggingConfig('%s::[%s]> ', window.navigator.language || 'en', 'LLL', [new logging_types_1.ContextLogLevel('*', logging_types_1.LogLevel.TRACE)]);
LoggingService = LoggingService_1 = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('loggingConfig')), __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [logging_types_1.LoggingConfig])
], LoggingService);
exports.LoggingService = LoggingService;
var LoggingService_1;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { log: noop, info: noop, debug: noop, warn: noop, error: noop };
}
exports.default = requireConsole;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
var sprintf_js_1 = __webpack_require__(7);
var moment = __webpack_require__(6);
var logging_types_1 = __webpack_require__(1);
var console_1 = __webpack_require__(3);
var LoggerBase = (function () {
    function LoggerBase() {
        this.countSprintfHolders = function (pattern) {
            var hasNamedHolders = /\x25\([a-zA-Z0-9_]+\)[b-fijosuxX]/.test(pattern);
            if (hasNamedHolders) {
                return 1;
            }
            var placeholderCounter = 0;
            function f(index) {
                return function () {
                    // keep track of highest arg index, needed for single -but indexed- placeholders placeholder (ie. %6$s consumes the first 6 arguments)
                    placeholderCounter = Math.max(placeholderCounter, index);
                };
            }
            sprintf_js_1.default(pattern, f(1), f(2), f(3), f(4), f(5), f(6), f(7), f(8), f(9), f(10));
            return placeholderCounter;
        };
    }
    LoggerBase.prototype.log = function (loggingFunc, level, context, config) {
        config.logLevels = config.logLevels || [];
        if (this.levelPassesThreshold(context, level, config)) {
            var enhancedArguments = this.enhanceLogline(arguments, context, level, config.datetimePattern, config.datetimeLocale, config.prefixPattern);
            loggingFunc.apply(null, enhancedArguments);
            return enhancedArguments; // return for testing purposes
        }
        else {
            return null; // no log produced
        }
    };
    ;
    LoggerBase.prototype.levelPassesThreshold = function (context, level, config) {
        return level > logging_types_1.LogLevel.OFF.level && level <= this.getLogLevelThreshold(context, config);
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
    LoggerBase.prototype.enhanceLogline = function (args, context, level, datetimePattern, datetimeLocale, prefixPattern) {
        var prefix = this.generatePrefix(context, level, datetimePattern, datetimeLocale, prefixPattern);
        var processedArgs = maybeApplySprintf([].slice.call(args));
        return [prefix].concat([].slice.call(processedArgs));
        function maybeApplySprintf(args) {
            var sprintfAvailable = typeof sprintf_js_1.default !== 'undefined';
            var sprintfCandidate = sprintfAvailable && args.length >= 2 && typeof args[0] === 'string' && args[0].indexOf('%') !== -1;
            if (sprintfCandidate) {
                try {
                    // apply sprintf with the proper arguments
                    var placeholderCount = this.countSprintfHolders(args[0]);
                    if (placeholderCount > 0) {
                        args[0] = sprintf_js_1.default.apply(null, args);
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
    };
    LoggerBase.prototype.generatePrefix = function (context, level, datetimePattern, datetimeLocale, prefixPattern) {
        var dateStr = '';
        if (typeof moment !== 'undefined') {
            dateStr = moment().locale(datetimeLocale).format(datetimePattern);
        }
        else {
            var d = new Date();
            var timeStr = new Date().toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];
            dateStr = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + timeStr;
        }
        if (typeof sprintf_js_1.default !== 'undefined') {
            return sprintf_js_1.default(prefixPattern, dateStr, context, level.name.toLowerCase());
        }
        else {
            // use fixed layout: '%s::[%s]%s> '
            return dateStr + '::' + context + '::' + level.name.toLowerCase() + '> ';
        }
    };
    return LoggerBase;
}());
var Logger = (function (_super) {
    __extends(Logger, _super);
    function Logger(context, config) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.config = config;
        _this.trace = function () { return _this.log(Logger.console.debug, logging_types_1.LogLevel.DEBUG, _this.context, _this.config); };
        _this.debug = function () { return _this.log(Logger.console.debug, logging_types_1.LogLevel.DEBUG, _this.context, _this.config); };
        _this.info = function () { return _this.log(Logger.console.info, logging_types_1.LogLevel.INFO, _this.context, _this.config); };
        _this.warn = function () { return _this.log(Logger.console.warn, logging_types_1.LogLevel.WARN, _this.context, _this.config); };
        _this.error = function () { return _this.log(Logger.console.error, logging_types_1.LogLevel.ERROR, _this.context, _this.config); };
        return _this;
    }
    return Logger;
}(LoggerBase));
Logger.console = console_1.default();
exports.Logger = Logger;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var logging_service_1 = __webpack_require__(2);
core_1.enableProdMode();
var LoggingModule = (function () {
    function LoggingModule() {
    }
    return LoggingModule;
}());
LoggingModule = __decorate([
    core_1.NgModule({
        providers: [logging_service_1.LoggingService]
    })
], LoggingModule);
exports.LoggingModule = LoggingModule;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = sprintf-js;

/***/ })
/******/ ]);
//# sourceMappingURL=logging.module.map