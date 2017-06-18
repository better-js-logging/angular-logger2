(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("moment"), require("sprintf-js"));
	else if(typeof define === 'function' && define.amd)
		define("AngularLogger2", ["@angular/core", "moment", "sprintf-js"], factory);
	else if(typeof exports === 'object')
		exports["AngularLogger2"] = factory(require("@angular/core"), require("moment"), require("sprintf-js"));
	else
		root["AngularLogger2"] = factory(root["ng"]["core"], root["moment"], root["sprintf-js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var LoggingConfig = (function () {
    function LoggingConfig(prefixPattern, datetimePattern, datetimeLocale, contextLogLevels) {
        this.prefixPattern = prefixPattern;
        this.datetimePattern = datetimePattern;
        this.datetimeLocale = datetimeLocale;
        this.contextLogLevels = contextLogLevels;
    }
    return LoggingConfig;
}());
LoggingConfig = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, String, String, Array])
], LoggingConfig);
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
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
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
var sprintfjs = __webpack_require__(8);
var sprintf = sprintfjs.sprintf;
var moment = __webpack_require__(7);
var logging_types_1 = __webpack_require__(0);
var console_1 = __webpack_require__(5);
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
        return this.log(arguments, Logger.console.trace, logging_types_1.LogLevel.TRACE, this.context, this.config);
    };
    Logger.prototype.debug = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, Logger.console.debug, logging_types_1.LogLevel.DEBUG, this.context, this.config);
    };
    Logger.prototype.info = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, Logger.console.info, logging_types_1.LogLevel.INFO, this.context, this.config);
    };
    Logger.prototype.warn = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, Logger.console.warn, logging_types_1.LogLevel.WARN, this.context, this.config);
    };
    Logger.prototype.error = function (message) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.log(arguments, Logger.console.error, logging_types_1.LogLevel.ERROR, this.context, this.config);
    };
    return Logger;
}(LoggerBase));
Logger.console = console_1.default();
exports.Logger = Logger;


/***/ }),
/* 3 */
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
var core_1 = __webpack_require__(1);
var logging_types_1 = __webpack_require__(0);
var logging_logger_1 = __webpack_require__(2);
var LoggingService = LoggingService_1 = (function () {
    function LoggingService(config) {
        this.config = config;
        if (config && typeof (console) !== 'undefined') {
            console.debug('creating new LoggingService with injected config:', config);
        }
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var logging_service_1 = __webpack_require__(3);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { trace: noop, debug: noop, info: noop, warn: noop, error: noop };
}
exports.default = requireConsole;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(0));
__export(__webpack_require__(2));
__export(__webpack_require__(3));


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-logger2.umd.js.map