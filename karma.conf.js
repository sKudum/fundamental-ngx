// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');

module.exports = () => {

    process.env.SAUCE_USERNAME = 'uiappframework';
    process.env.SAUCE_ACCESS_KEY = 'bbb2b274-6854-456a-aa18-6a311ad10b69';
    // Browsers to run on Sauce Labs
    var customLaunchers = {
        ChromeHeadlessNoSandbox: {
            base: "ChromeHeadless",
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
        basePath: '',
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-sauce-launcher')

        ],
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
        // list of files / patterns to load in the browser
        // files: [
        //     { pattern: '../src/**/*.spec.ts', included: false, watched: true }
        // ],
        preprocessors: { 'dist/apps/**/*.js': ['coverage'] },

        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml', 'dots', 'saucelabs'],
        port: 9876,
        colors: true,
        logLevel: constants.LOG_INFO,
        autoWatch: true,
        //  browsers: ['ChromeHeadlessNoSandbox'],
        singleRun: true,
        // customLaunchers: {
        //     ChromeHeadlessNoSandbox: {
        //         base: "ChromeHeadless",
        //         flags: [
        //             "--no-sandbox",
        //             // required to run without privileges in Docker
        //             "--disable-web-security",
        //             "--disable-gpu",
        //             "--remote-debugging-port=9222"
        //         ]
        //     }
        // },
        parallelOptions: {
            executors: 3
        },
        sauceLabs: {
            testName: 'Karma and Sauce Labs unit testing'
            // sauce_connect: true,
            // idleTimeout: 1000,
            // commandTimeout: 600,
            // maxDuration: 3600
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers)
    };

};
