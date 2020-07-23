// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf');
const getSauceKarmaConfig = require('../../karma.conf-ci');
var customLaunchers = {
    'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest'
    }
    // },
    // 'SL_Firefox': {
    //     base: 'SauceLabs',
    //     browserName: 'firefox',
    //     version: '26'
    // },
    // 'SL_Safari': {
    //     base: 'SauceLabs',
    //     browserName: 'safari',
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

module.exports = function (config) {
    const baseConfig = getBaseKarmaConfig();
    const sauceConfig = getSauceKarmaConfig();
    config.set({
        ...baseConfig,
        coverageIstanbulReporter: {
            ...baseConfig.coverageIstanbulReporter,
            dir: join(__dirname, '../../coverage/libs/core')
        },
        sauceLabs: {
            ...baseConfig.sauceLabs,
            dir: join(__dirname, '../../coverage/libs/core')
        },
        browsers: Object.keys(customLaunchers)
        // browsers: ['ChromeHeadless', 'sl_chrome', 'sl_firefox', 'sl_ios_safari', 'sl_ie_11']
    });
};
