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
require('./gulp/helpers')(gulp, $, merge, config);
require('./gulp/json')(gulp, $, config);
require('./gulp/styles')(gulp, $, reload, merge, config);
require('./gulp/inject')(gulp, $, merge, config);
require('./gulp/views')(gulp, $, merge, reload, config);
require('./gulp/scripts')(gulp, $, merge, config);
require('./gulp/html')(gulp, $, merge, config);
require('./gulp/images')(gulp, $, config);
require('./gulp/fonts')(gulp, config);
require('./gulp/lint')(gulp, $, handleError, reload, config);
require('./gulp/serve')(gulp, $, browserSync, reload);
require('./gulp/build')(gulp, $, config);

// -----------------------------------------------------------------|
// TODO
// -----------------------------------------------------------------|
// responsive images (gulp-responsive)
// add js testing framework (mocha)
