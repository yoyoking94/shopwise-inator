module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            jasmine: {},
            clearContext: false,
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/frontend'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
        },
        reporters: ['progress', 'kjhtml'],
        customLaunchers: {
            BraveHeadless: {
                base: 'Chrome',
                flags: ['--headless', '--no-sandbox', '--disable-gpu'],
            },
            Brave: {
                base: 'Chrome',
                flags: ['--no-sandbox'],
            },
            ChromeHeadless: {
                base: 'Chrome',
                flags: ['--headless', '--no-sandbox', '--disable-gpu'],
            },
        },
        browsers: [process.env.CHROME_BIN ? 'Brave' : 'ChromeHeadless'],
        restartOnFileChange: true,
    });
};