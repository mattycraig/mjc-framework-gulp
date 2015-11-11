// -----------------------------------------------------------------|
// GULPFILE.BABEL.JS
// -----------------------------------------------------------------|
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import browserSync from 'browser-sync';

const reload = browserSync.reload;
const $ = gulpLoadPlugins();
const config = require('./gulp/config.json');

// SET DEV ENVIRONMENT?
// --------------------------------------|
// If true, compiles files to /dist/dev
// Outputs non-min css/js & jade cmpnts
// --------------------------------------|
global.devEnv = false;

// ERROR NOTIFICATIONS
// --------------------------------------|
let handleError = (task) => {
	return (err) => {
		$.util.log(err.message);
		$.notify.onError(task + ' failed!')(err);
		this.emit('end');
	};
}

// TASKS
// --------------------------------------|
import helpers from './gulp/helpers';
import json from './gulp/json';
import styles from './gulp/styles';
import inject from './gulp/inject';
import views from './gulp/views';
import scripts from './gulp/scripts';
import html from './gulp/html';
import images from './gulp/images';
import fonts from './gulp/fonts';
import lint from './gulp/lint';
import serve from './gulp/serve';
import build from './gulp/build';

helpers(gulp, $, merge, config);
json(gulp, $, config);
styles(gulp, $, reload, merge, config);
inject(gulp, $, merge, config);
views(gulp, $, merge, reload, config);
scripts(gulp, $, merge, config);
html(gulp, $, merge, config);
images(gulp, $, config);
fonts(gulp, config);
lint(gulp, $, handleError, reload, config);
serve(gulp, $, browserSync, reload);
build(gulp, $, config);

// -----------------------------------------------------------------|
// TODO
// -----------------------------------------------------------------|
// responsive images (gulp-responsive)
// specific watch tasks so tasks aren't duplicated
