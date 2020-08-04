// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');
var fs = require('fs');

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (process.env.TRAVIS) {
        sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
        sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
        // Also use the SauceLabs reporter provided by 'karma-sauce-launcher',
        // otherwise the `{passed}` flag never gets set (hence the gray builds in the browser matrix badge).
        reporters.push('saucelabs');
    }
    if (!process.env.SAUCE_USERNAME) {
        process.env.SAUCE_USERNAME = require('./sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        }
        // ,
        // sl_firefox: {
        //     base: 'SauceLabs',
        //     browserName: 'firefox',
        //     version: 'latest'
        // },
        // sl_ie_11: {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     version: 'latest'
        // }
    };

    config.set({


        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

        frameworks: [
            'jasmine',
            "karma-typescript"
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['dots', 'spec', 'karma-typescript'],


        // web server port
        port: 9876,
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        colors: true,
        files: [
            './examples/src/*.js',
            './examples/test/*.js'
        ],
        reporters: ['progress', 'saucelabs'],
        // files: [
        //     { pattern: 'node_modules/**', included: false, watched: false },
        //     { pattern: '/base.spec.ts' },
        //     { pattern: '../libs/core/src/lib/**/*' }
        // ],
        // preprocessors: {
        //     '../libs/core/src/lib/**/*.ts': ['karma-typescript']
        // },
        // mime: {
        //     'text/x-typescript': ['ts', 'tsx']
        // },
        // coverageIstanbulReporter: {
        //     reports: ['html', 'lcovonly'],
        //     fixWebpackSourcePaths: true,
        //     thresholds: {
        //         statements: 80,
        //         lines: 80,
        //         branches: 40,
        //         functions: 60
        //     }
        // },
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json'
        },
        // specReporter: {
        //     maxLogLines: 5,             // limit number of lines logged per test
        //     suppressErrorSummary: true, // do not print error summary
        //     suppressFailed: false,      // do not print information about failed tests
        //     suppressPassed: false,      // do not print information about passed tests
        //     suppressSkipped: true,      // do not print information about skipped tests
        //     showSpecTiming: false           // test would finish with error when a first fail occurs.
        // },

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: constants.LOG_INFO,

        sauceLabs: {
            startConnect: true,
            region: "eu-central-1",
            extendedDebugging: true,
            capturePerformance: true,
            recordScreenshots: false
        },
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
        captureTimeout: 120000,
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
};
