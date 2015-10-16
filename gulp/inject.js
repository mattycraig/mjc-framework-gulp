// -----------------------------------------------------------------|
// INJECT TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function(gulp, $, merge, config) {

	function inject(src, injectSrc, ignorePath, dest) {
		return gulp.src(src)
			.pipe($.inject(gulp.src(injectSrc, {read: false}),
				{
					ignorePath: ignorePath,
					relative: false,
					addRootSlash: false
				}
			))
			.pipe(gulp.dest(dest));
	}

	// INJECT SCRIPTS
	// --------------------------------------|
	gulp.task('inject:scripts', () => {
		// Inject our script tags into our jade foot partial
		inject(config.inject.scripts.jade, config.inject.scripts.src, config.inject.scripts.ignore, config.inject.scripts.dest);
	});

	// INJECT SCRIPTS FOR TESTS
	// --------------------------------------|
	gulp.task('inject:tests', () => {
		// Inject our script tags into our test index.html file
		inject(config.inject.tests.test, config.inject.tests.src, config.inject.tests.ignore, config.inject.tests.dest);
	});
};
