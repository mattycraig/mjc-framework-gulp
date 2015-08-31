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
};
