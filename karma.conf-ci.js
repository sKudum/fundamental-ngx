//Karma travsci configuration for saucelab

'use strict';
const { constants } = require('karma');
const { join } = require('path');

module.exports = function () {

    // Use ENV vars on Travis locally to get credentials

    process.env.SAUCE_USERNAME = 'uiappframework';
    process.env.SAUCE_ACCESS_KEY = 'bbb2b274-6854-456a-aa18-6a311ad10b69';

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        }
        // 'SL_Firefox': {
        //     base: 'SauceLabs',
        //     browserName: 'firefox',
        //     version: '26'
        // },
        // 'SL_Safari': {
        //     base: 'SauceLabs',
        //     browserName: 'safari',
        //     platform: 'OS X 10.9',
        //     version: '7'
        // },
        // 'SL_IE_9': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 2008',
        //     version: '9'
        // },
        // 'SL_IE_10': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 2012',
        //     version: '10'
        // },
        // 'SL_IE_11': {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows 8.1',
        //     version: '11'
        // }
    };

    if (process.env.TRAVIS) {
        sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
        sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }

    return {

        plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-ie-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-sauce-launcher')

        ],

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],


        // list of files / patterns to load in the browser
        files: [
            { pattern: './libs/**/*', included: false, watched: true }
        ],

        // dir: join(__dirname, '../coverage'),


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'saucelabs'],


        // web server port
        port: 9877,

        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: constants.LOG_INFO,

        sauceLabs: {
            testName: 'Karma and Sauce Labs unit testing',
            startConnect: false
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        singleRun: true
    }
};
