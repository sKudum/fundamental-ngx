//Karma travsci configuration for saucelab

'use strict';

process.env.SAUCE_USERNAME = 'uiappframework';
process.env.SAUCE_ACCESS_KEY = 'bbb2b274-6854-456a-aa18-6a311ad10b69';


module.exports = function (config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
        process.exit(1)
    }

    // Browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/OS combos
    const customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        },
        sl_ios_safari: {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: ' OS X 10.9',
            version: 'latest'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: 'latest'
        }
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/*.js'
        ],
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        sauceLabs: {
            testName: 'Build: ' + (process.env.TRAVIS_BUILD_NUMBER || 'Local') + ' - Angular Media Events',
            recordScreenshots: true,
            recordVideo: true,
            connectOptions: {
                logfile: 'sauce_connect.log'
            },
            public: 'public'
        },
        // Increase timeout in case connection in CI is slow
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true,
        autowatch: true
    })
};
