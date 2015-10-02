// -----------------------------------------------------------------|
// INJECT TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, merge, config) => {

	// INJECT SCRIPTS
	// --------------------------------------|
	gulp.task('inject:scripts', () => {
		// Inject our script tags into our jade foot partial
		return gulp.src(config.inject.scripts.jade)
			.pipe($.inject(gulp.src(config.inject.scripts.src, {read: false}),
				{
					ignorePath: 'app',
					relative: false,
					addRootSlash: false
				}
			))
			.pipe(gulp.dest(config.inject.scripts.dest));
	});

	// INJECT SCRIPTS FOR TESTS
	// --------------------------------------|
	gulp.task('inject:tests', () => {
		// Inject our script tags into our test index.html file
		return gulp.src(config.inject.tests.test)
			.pipe($.inject(gulp.src(config.inject.tests.src, {read: false}),
				{
					ignorePath: ['test', 'app'],
					relative: false,
					addRootSlash: false
				}
			))
			.pipe(gulp.dest(config.inject.tests.dest));
	});
};
