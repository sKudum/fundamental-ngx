// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');

module.exports = () => {
    process.env.SAUCE_USERNAME = 'sso-sap-I505386';
    process.env.SAUCE_ACCESS_KEY = 'b5380f8c-f030-4960-b95d-a212f744eba0';

    // Defining custom browser configuration for karma. Mainly using for all the custom Sauce Labs (SL_) remote flavors
    const customLaunchers = {
        ChromeHeadlessNoSandbox: {
            base: "SauceLabs",
            flags: [
                "--no-sandbox",
                // required to run without privileges in Docker
                "--disable-web-security",
                "--disable-gpu",
                "--remote-debugging-port=9222"
            ]
        },
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        }
        // ,
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
        // },
    }

    // If we're running inside Travis we will set the TRAVIS_BUILD_NUMBER and TRAVIS_BUILD_ID as the Sauce Labs build
    // This will allow us to easily link back from Sauce Labs to Travis
    if (process.env.TRAVIS_BUILD_NUMBER && process.env.TRAVIS_BUILD_ID) {
        sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
    }

    return {
        basePath: '',
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-spec-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-sauce-launcher')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: constants.LOG_INFO,
        autoWatch: true,
        // By default we run Test only locally on the ChromeHeadlessNoSandbox customLauncher
        /// browsers: ['ChromeHeadlessNoSandbox'],
        singleRun: true,
        customLaunchers: customLaunchers,
        // files: [
        //     { pattern: './libs/**/*.spec.ts', included: false, watched: true }
        // ],
        parallelOptions: {
            executors: 1
        },

        // We're increasing the timeouts and tolerance quite a bit to ensure that test don't time out
        // See: https://support.saucelabs.com/hc/en-us/articles/225104707-Karma-Tests-Disconnect-Particularly-When-Running-Tests-on-Safari
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
        captureTimeout: 4 * 60 * 1000, //default 60000
        flags: [
            '--disable-web-security',
            '--disable-gpu',
            '--no-sandbox'
        ],

        // Setting Basic Sauce Labs configuration with Sauce Connect
        // Our central integration uses the eu-central-1 region due to higher capacity
        sauceLabs: {
            testName: 'Karma unit testing fundamental-ngx',
            startConnect: true,
            region: "eu-central-1",
            idleTimeout: 10000,
            reporters: ['spec'],
            tunnelIdentifier: 'sap-intranet',
            parentTunnel: 'S-A-P'
        },
        browsers: Object.keys(customLaunchers),

        specReporter: {
            maxLogLines: 5,             // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false,      // do not print information about failed tests
            suppressPassed: false,      // do not print information about passed tests
            suppressSkipped: true,      // do not print information about skipped tests
            showSpecTiming: false           // test would finish with error when a first fail occurs.
        }
    };
};
