/* global -$ */
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import browserSync from 'browser-sync';

const reload = browserSync.reload;
const $ = gulpLoadPlugins();

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
require('./gulp/lintScripts')(gulp, $, browserSync, reload, handleError, config);
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
// add js testing framework (mocha)
// add es6lint in place of jscs + jshint
