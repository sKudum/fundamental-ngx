//Karma travsci configuration for saucelab

'use strict';
const { constants } = require('karma');
const { join } = require('path');

module.exports = function () {

    // Use ENV vars on Travis locally to get credentials

    process.env.SAUCE_USERNAME = 'sso-sap-I505386';
    process.env.SAUCE_ACCESS_KEY = 'b5380f8c-f030-4960-b95d-a212f744eba0';

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        }
        // 'SL_Firefox': {
        //     base: 'SauceLabs',
        //     browserName: 'firefox',
        //     version: '26'
        // },
        // 'SL_Safari': {
        //     base: 'SauceLabs',
        //     browserName: 'safari',
        //     platform: 'OS X 10.9',
        //     version: '7'
        // },
        // 'SL_IE_9': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 2008',
        //     version: '9'
        // },
        // 'SL_IE_10': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 2012',
        //     version: '10'
        // },
        // 'SL_IE_11': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 8.1',
        //     version: '11'
        // }
    };

    // If we're running inside Travis we will set the TRAVIS_BUILD_NUMBER and TRAVIS_BUILD_ID as the Sauce Labs build
    // This will allow us to easily link back from Sauce Labs to Travis
    if (process.env.TRAVIS_BUILD_NUMBER && process.env.TRAVIS_BUILD_ID) {
        sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
        sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }

    return {

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-ie-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-spec-reporter'),
            require('karma-sauce-launcher')

        ],

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // frameworks: ['jasmine', '@angular-devkit/build-angular'],


        // list of files / patterns to load in the browser
        // files: [
        //     { pattern: './libs/**/*', included: false, watched: true }
        // ],

        // dir: join(__dirname, '../coverage'),
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'kjhtml', 'dots', 'specs'],


        // web server port
        // port: 9877,

        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: constants.LOG_INFO,
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 10, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000


        sauceLabs: {
            testName: 'Karma and Sauce Labs unit testing',
            startConnect: true,
            customData: {
                idleTimeout: 1000
            },
            region: "eu-central-1",
            idleTimeout: 1000
        },
        captureTimeout: 4 * 60 * 1000, //default 60000
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        singleRun: true,
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        }
    }
};

