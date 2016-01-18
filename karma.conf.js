// Karma configuration
// Generated on Fri Jun 26 2015 11:39:06 GMT+1200 (NZST)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser

        files: [
            'bower_components/promise-polyfill/Promise.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/jasmine-es6-promise-matchers/jasmine-es6-promise-matchers.js',
            'dist/news.js',
            'dist/news.model.service.js',
            'dist/news.controller.js',
            'dist/news.service.js',
            'dist/news.directive.js',
            'specs/*.js'
        ],


        ngHtml2JsPreprocessor: {
            moduleName: 'my.templates'

        },
        preprocessors: {

            'dist/*.js': 'coverage'
        } ,

        plugins : [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-junit-reporter'
        ],

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','coverage'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox','PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}


//Angular Karma ngHtml2JsPreprocessor directive template url not working