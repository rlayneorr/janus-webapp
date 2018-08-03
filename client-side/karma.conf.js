// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      //require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    //port: 3000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    /** * maximum number of tries a browser will attempt in the case of a disconnection */ 
    browserDisconnectTolerance: 2,
    /** * How long will Karma wait for a message from a browser before disconnecting from it (in ms). */ 
    browserNoActivityTimeout: 50000,
    /**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   *
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   * 
   * Fix issue with Cannot resolve 'fs' error when running Karma
   *
   */   
    webpack: { node: { fs: 'empty', } }
  });
  
};

