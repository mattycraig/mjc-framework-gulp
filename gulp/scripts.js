// -----------------------------------------------------------------|
// SCRIPTS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, merge, config) => {

	// INDIVIDUAL TASK: SCRIPTS
	// --------------------------------------|
	gulp.task('task:scripts', ['lint:scripts'], () => {
		// Lint scripts
		// Uglify
		// Copy to dist/js
		var scripts = gulp.src(config.scripts.src.js)
			.pipe($.uglify())
			.pipe(gulp.dest(config.scripts.dest.prod));

		// Lint scripts
		// Copy to dist/dev/js
		var scriptsDev = gulp.src(config.scripts.src.js)
			.pipe(gulp.dest(config.scripts.dest.dev));

		return merge(scripts, scriptsDev);
	});
};
