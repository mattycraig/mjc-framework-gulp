// -----------------------------------------------------------------|
// LINT SCRIPTS TASK
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, reload, config) => {

	// LINT SCRIPTS
	// --------------------------------------|
	gulp.task('lint:scripts', () => {
		// Lint using ESLint
		// Report errors in console
		// Notiify of an error (to be fixed)
		return gulp.src(config.lintscripts.src.js)
			.pipe(reload({
				stream: true,
				once: true
			}))
			.pipe($.eslint())
			.pipe($.eslint.format())
			.pipe($.eslint.format('stylish', $.notify.onError('ESLint failed!\nSee console for details')));
	});

	// LINT GULPFILE(S)
	// --------------------------------------|
	gulp.task('lint:gulp', () => {
		// Lint using ESLint
		// Report errors in console
		// Notiify of an error (to be fixed)
		return gulp.src(config.lintscripts.src.gulp)
			.pipe($.eslint())
			.pipe($.eslint.format())
			.pipe($.eslint.format('stylish', $.notify.onError('ESLint failed!\nSee console for details')));
	});

};
