/* global -$ */
'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();
var config = require('./gulp/config.json');

// ERROR NOTIFICATIONS
// --------------------------------------|
function handleError(task) {
	return function(err) {
		$.util.log(err.message);
		$.notify.onError(task + ' failed!')(err);
		this.emit('end');
	};
}

// TASKS
// --------------------------------------|
require('./gulp/helpers')(gulp);
require('./gulp/styles')(gulp, $, reload, merge, config);
require('./gulp/views')(gulp, $, merge, config);
require('./gulp/lintHtml')(gulp, $, handleError, config);
require('./gulp/lintScripts')(gulp, $, reload, handleError, config);
require('./gulp/html')(gulp, $, merge, config);
require('./gulp/images')(gulp, $, config);
require('./gulp/fonts')(gulp, config);
require('./gulp/copy')(gulp, $, merge, config);
require('./gulp/serve')(gulp, $, browserSync, reload);
require('./gulp/wiredep')(gulp, config);
require('./gulp/build')(gulp, $, config);

// -----------------------------------------------------------------|
// TODO
// -----------------------------------------------------------------|
// responsive images (gulp-responsive)
// add js testing framework (jasmine/mocha)
