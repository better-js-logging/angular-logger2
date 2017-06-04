[![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Code Climate][codeclimate-gpa-image]][codeclimate-url] [![Codacy Badge][codacy-shields-image]][codacy-url]

# angular-logger2

```typescript
// this example: resuable logging service, which overrides all static defaults and provides own logging contexts

let ls:LoggingService = new LoggingService(new LoggingConfig(
    /* optional prefixPattern = */ undefined, // defaults to '%s::[%s]> '
    /* optional datetimePattern = */ 'dddd h:mm:ss a', // default is 'LLL'
    /* optional datetimeLocale = */ 'en', // default is window.navigator.language || 'en'
    /* optional logLevels = */ [ // default is '*': TRACE
        new ContextLogLevel('*', LogLevel.OFF),
        new ContextLogLevel('main', LogLevel.WARN),
        new ContextLogLevel('main.subB', LogLevel.TRACE)
    ]
));

ls.getInstance('banana').info('Hello World!'); // ignored, logging turned off for '*'
ls.getInstance('main.subA').info('Hello World!'); // ignored, doesn't pass logging threshold of 'main'
ls.getInstance('main.subB').trace('Hello World!'); // <17-5-2015 11:52:52::[main.subB]> Hello World!
ls.getInstance('main.subB').info('Hello %s!', 'World', { 'extra': ['pass-through params'] });
// <3-6-2017 11:53:51::[main.subB]> Hello World! Object { "extra": "pass-through params"}

// or java style:
class YourClass {
    private static readonly LOGGER:Logger = LoggingService.getLogger(YourClass.name);
}
```

### [WORKING DEMO](http://plnkr.co/edit/ZZVA5nmyKpEWxztchYMx?p=preview)

---

- [About](#about)
- [Installing](#installing)
- [Getting Started](#getting-started)
- [Applying Patterns](#applying-patterns)
		- [Prefix pattern](#prefix-pattern)
		- [Datetime stamp patterns](#datetime-stamp-patterns)
		- [Logging patterns](#logging-patterns)
- [Managing logging priority](#managing-logging-priority)
- [Reusable LoggingService instance outside of Angular](#reusable-loggingservice-instance-outside-of-angular)

---

## About

This library gives your angular app proper logging capabilities (and non-angular apps for simple usage). Although you can configure patterns and logging level priorities, it also simply works as a simple drop-in completely configured with sensible defaults ([demo](https://jsfiddle.net/plantface/b0v0s2rg/)).

* Gives you Logging API, so that you can define **separate contexts** to log for, where the output will be prepended with the context's name, a datetime stamp and can be furter expanded to include the logging level.
* Further enhances the logging functions so that you can **apply patterns** eliminating the need of manually concatenating your strings
* Introduces **log levels**, where you can manage logging output per context or even a group of contexts
* Works as a **injectable or standalone** service or as a **complete drop-in** replacement for your current [`console.log` statements][console-logger]

## Installing

```
npm install angular-logger2 --save
```

angular-logger2 has optional dependencies on _[momentjs](https://github.com/moment/moment)_ and _[sprintf.js](https://github.com/alexei/sprintf.js)_: without moment you can't pattern a nicely readable datetime stamp and without sprintf you can't pattern your logging input lines. Default fixed patterns are applied if either they are missing.

```
npm install sprintf-js --save
npm install moment --save
```

## Getting Started

### Importing the library types

First you need to decide if you wish to use the commonjs, esmodule or UMD module versions. The demo uses commonjs:

import { LoggingService, LoggingConfig, ContextLogLevel, LogLevel } from 'angular-logger2/dist-commonjs/index.js';

### Configure defaults... or not

Every level of API gives an opertunity to provide defauts overriding values on levels below. You can define *no* config at all, define config for a `LoggingService` instance or define config when getting a single `Logger` instance.

```typescript
// For example the following calls all use the static default of the lowest level:
LoggingService.getLogger();
new LoggingService().getLogger();

// Next, overriding *some* defaults with new defaults one level higher (undefined leaves previous default in):
new LoggingService(new LoggingConfig('new default prefixpattern', undefined, undefined, customLogLevels)).getLogger();

// Again override *some* default with new defaults one level higher:
LoggingService.getLogger('custom context', 'custom prefixpattern');
myLoggingService.getLogger('custom context', 'custom prefixpattern');
```

### Configure injectable reusable LoggingService instance in Angular context

1. Add LoggingService as a provider in your module:

    ```typescript
    import {NgModule} from '@angular/core';
    import {BrowserModule} from '@angular/platform-browser';

    import {YourApp} from './app/your-app';

    import {LoggingService} from "angular-logger2/dist-esmodule";

    @NgModule({
        declarations: [ YourApp ],
        providers: [LoggingService],
        imports: [ BrowserModule ],
        bootstrap: [ YourApp ]
    })

    export class YourModule { }
    ```

2. Optionally add default config to override to static sensible defaults:

    ```typescript
        providers: [LoggingService, {provide: LoggingConfig, useValue: new LoggingConfig(/* values */)}],
    ```

2. Have the LoggingService injected in your service or component by Angular:

    ```
    import {Component} from "@angular/core";
    import {LoggingService} from "angular-logger2/dist-esmodule";

    @Component({
        template: ''
    })
    export class YourComponent {

        constructor(protected readonly loggingService: LoggingService) {
            this.loggingService.getLogger().warn('yay');
        }
    }
    ```

## Applying Patterns

#### Prefix pattern

By default, the prefix is formatted like so (if sprintf-js is present):

```javascript
datetime here::[context name here]>your logging input here

// if sprintf.js is missing, angular-logger2 defaults back to a fixed pattern that does include the used loglevel:
datetime here::context name here::loglevel used here>your logging input here
```

However, the patter is very flexible. For example, you can change this as follows:

```javascript
// prefix pattern '%s - %s: '
loggingService.getInstance('app').info('Hello World');

// was:    Sunday 12:55:07 am::[app]>Hello World
// became: Sunday 12:55:07 am - app: Hello World
```

And if you add another prefix-placeholder `%s`, you get the log level as well:

```javascript
// pattern '%s - %s - %s: ' -> Sunday 12:55:07 am - app - info: Hello World
```

You can also remove it completely, or have just the datetime stamp or just the context prefixed:

```javascript
// by the power of sprintf!
// '%s - %s: '            -> both
// '%s: '                 -> timestamp
// '%1$s: '               -> timestamp by index
// '%2$s: '               -> context by index
// '%2$s - %1$s: '        -> both, reversed
// '%3$s: '               -> logging level by index
// '%3$s - %2$s - %1$s: ' -> loglevel, context and timestamp reversed
```

This works because angular-logger2 will use three arguments context, timestamp and loglevel for the prefix, which can be referenced by index.

You can even align the values within the pattern using _sprintf_. Here's a complete example of all possibilities:

```javascript
// '%1$s %3$5s %2$-30s' ->
// June 4, 2017 10:16 AM  info MyService                      In this example the loglevels are aligned right, with padding
// June 4, 2017 10:16 AM error MyReader                       The contexts (class names in this case) are aligned left
// June 4, 2017 10:16 AM  info MyVeryLongServiceFactoryName   Also includes the loglevel (3rd  '%s'), switched places with the context
```


pattern|explanation
---|---
%s      | indicates a string format
%2$s    | indicates a string format with argument 2
%2$30s  | indicates a string format with argument 2 padding to be minimally 30 long
%2$-30s | indicates a string format with argument 2 padding to be minimally 30 long, content aligned to the left

#### Datetime stamp patterns

If you have included _momentjs_ in your dependencies, you can start using datetime stamp patterns with angular-logger2. The default pattern is `LLL`, which translates to a localized string that matches the current user's Locale. You customize the pattern as follows:

```typescript
// datetimePattern = 'dddd';
myLoggingService.getInstance('app').info('Hello World');

// was:    Sunday 12:55:07 am::[app]>Hello World
// became: Sunday::[app]>Hello World
```

A pattern like `dddd h:mm:ss a` would translate to something like "Sunday 12:55:07 am". You can easily switch to a 24h format as well, using these patterns.

 * For all options, see [moment.js](http://momentjs.com/docs/#/displaying/)

#### Logging patterns

If you have included _sprintf-js_ in your dependencies, you can start using patterns with _angular-logger2_.

Traditional style with `$console`:
```javascript
console.error ("Error uploading document [" + filename + "], Error: '" + err.message + "'. Try again later.")
// Error uploading document [contract.pdf], Error: 'Service currently down'. Try again later. "{ ... }"
```

Modern style with angular-logger2:
 ```typescript
let logger:Logger = LoggingService.getInstance("myapp.file-upload");
logger.error("Error uploading document [%s], Error: '%s'. Try again later.", filename, err.message)
// Sunday 12:13:06 pm::[myapp.file-upload]> Error uploading document [contract.pdf], Error: 'Service currently down'. Try again later.
 ```

---

You can even **combine pattern input and normal input**:
 ```typescript
let logger = myLoggerService.getInstance('test');
logger.warn("This %s pattern %j", "is", "{ 'in': 'put' }", "but this is not!", ['this', 'is', ['handled'], 'by the browser'], { 'including': 'syntax highlighting', 'and': 'console interaction' });
// 17-5-2015 00:16:08::[test]>  This is pattern "{ 'in': 'put' }" but this is not! ["this", "is handled", "by the browser"] Object {including: "syntax highlighting", and: "console interaction"}
 ```

To **log an `Object`**, you now have three ways of doing it, but the combined solution shown above has best integration with the browser.
 ```javascript
logger.warn("Do it yourself: " + JSON.stringify(obj)); // json string with stringify's limitations
logger.warn("Let sprintf handle it: %j", obj); // json string with sprintf's limitations
logger.warn("Let the browser handle it: ", obj); // interactive tree in the browser with syntax highlighting
logger.warn("Or combine all!: %s, %j", JSON.stringify(obj), obj, obj);

logger.info("What about %s?", function() { return "functions"; });
logger.info("What about delaying creating objects until %j?", function() { return {n:"needed"}; });
 ```

 * For all options, see [sprintf.js](https://github.com/alexei/sprintf.js)

## Managing logging priority

Using logging levels, we can manage output on several levels. Contexts can be named using dot '.' notation, where the names before dots are interpreted as groups or packages.

For example for `a.b` and `a.c` we can define a general log level for `a` and have a different log level for only `a.c`.

The following logging functions (left side) are available:

logging function  | mapped to: | with logLevel
----------------- | --------------- | --------------
_`logger.trace`_  | _`console.trace`_       | `TRACE`
_`logger.debug`_  | _`console.debug`_       | `DEBUG`
_`logger.info`_   | _`console.info`_        | `INFO`
_`logger.warn`_   | _`console.warn`_        | `WARN`
_`logger.error`_  | _`console.error`_       | `ERROR`

The level's order are as follows:
```
  1. TRACE: displays all levels, is the finest output and only recommended during debugging
  2. DEBUG: display all but the finest logs, only recommended during develop stages
  3. INFO : Show info, warn and error messages
  4. WARN : Show warn and error messages
  5. ERROR: Show only error messages.
  6. OFF  : Disable all logging, recommended for silencing noisy logging during debugging. *will* surpress errors logging.
```
Example:

```typescript
// config log levels before the application wakes up
const loggingService:LoggingService = new LoggingService(new LoggingConfig(
    '%s::[%s]> ', undefined, undefined, [
        new ContextLogLevel('a.b.c', LogLevel.TRACE), // trace + debug + info + warn + error
        new ContextLogLevel('a.b.d', LogLevel.ERROR), // error
        new ContextLogLevel('a.b', LogLevel.DEBUG), // debug + info + warn + error
        new ContextLogLevel('a', LogLevel.WARN), // warn + error
        new ContextLogLevel('*', LogLevel.INFO) // info + warn + error
    ]
));

// globally only INFO and more important are logged
// for group 'a' default is WARN and ERROR
// a.b.c and a.b.d override logging everything-with-TRACE and least-with-ERROR respectively
```

[working demo](http://plnkr.co/edit/zs0WFq?p=preview)

## Reusable `LoggingService` instance outside of Angular

You can have an injectable `LoggingService` instance configured as _provider_, but that doesn't mean you can't use the same instance outside of Angular.

Here's one example how to have a one single truth:

```typescript
/// defaultLoggingService.ts
import {ContextLogLevel, LoggingConfig, LoggingService, LogLevel} from "angular-logger2/dist-esmodule";

const defaultLoggingConfig:LoggingConfig = new LoggingConfig('%1$s %3$5s %2$-30s' /* , other config... */);

const defaultLoggingService:LoggingService = new LoggingService(defaultLoggingConfig);
export default defaultLoggingService;
```
```typescript
/// YourAppModule.ts
import defaultLoggingService from "./defaultLoggingService";

@NgModule({
    (..)
    providers: [{provide: LoggingService, useValue: defaultLoggingService}]
})
```
```typescript
/// YourNonAngularClass.ts
import defaultLoggingService from "./defaultLoggingService";

// const logger = defaultLoggingService.getLogger('some context');
// or:
class YourNonAngularClass {
    private static readonly LOGGER:Logger = defaultLoggingService.getLogger(YourNonAngularClass.name);
}
```


[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: http://travis-ci.org/better-js-logging/angular-logger2
[travis-image]: https://img.shields.io/travis/better-js-logging/angular-logger2.svg?style=flat

[codeclimate-url]: https://codeclimate.com/github/better-js-logging/angular-logger2
[codeclimate-gpa-image]: https://codeclimate.com/github/better-js-logging/angular-logger2/badges/gpa.svg

[codacy-url]: https://www.codacy.com/app/b-bottema/angular-logger2/dashboard
[codacy-image]: https://www.codacy.com/project/badge/b23f651a897e4af99ced8534adeaa401
[codacy-shields-image]: https://img.shields.io/codacy/b23f651a897e4af99ced8534adeaa401.svg?style=flat