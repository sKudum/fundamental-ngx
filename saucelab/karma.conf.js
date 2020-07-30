// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');
var fs = require('fs');

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        if (!fs.existsSync('sauce.json')) {
            console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
            process.exit(1);
        } else {
            process.env.SAUCE_USERNAME = require('./sauce').username;
            process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
        }
    }

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        'SL_Firefox': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        }
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

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],


        // web server port
        port: 9876,
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        colors: true,
        files: [
            //  { pattern: '/\.spec\.ts/', included: true, watched: true }
            {
                pattern: '../libs/core/src/lib/*/*\.spec\.ts'
            },
            {
                pattern: '../libs/platform/src/lib/components/*/*\.spec\.ts'
            }
        ],
        specReporter: {
            maxLogLines: 5,             // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false,      // do not print information about failed tests
            suppressPassed: false,      // do not print information about passed tests
            suppressSkipped: true,      // do not print information about skipped tests
            showSpecTiming: false           // test would finish with error when a first fail occurs.
        },

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: constants.LOG_INFO,

        sauceLabs: {
            testName: 'Karma and Sauce Labs demo',
            startConnect: true,
            region: "eu-central-1"
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
};
