/* global -$ */
'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

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
require('./gulp/styles')(gulp, $, reload, merge);
require('./gulp/views')(gulp, $, merge);
require('./gulp/lintHtml')(gulp, $, handleError);
require('./gulp/lintScripts')(gulp, $, reload, handleError);
require('./gulp/html')(gulp, $, merge);
require('./gulp/images')(gulp, $);
require('./gulp/fonts')(gulp);
require('./gulp/copy')(gulp, $, merge);
require('./gulp/serve')(gulp, $, browserSync, reload);
require('./gulp/wiredep')(gulp);
require('./gulp/build')(gulp, $);

// -----------------------------------------------------------------|
// TODO
// -----------------------------------------------------------------|
// responsive images (gulp-responsive)
// add testing framework (jasmine/mocha)
