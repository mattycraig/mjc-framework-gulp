// -----------------------------------------------------------------|
// COPY TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, merge, config) => {

	// COPY ALL ROOT FILES + DEV JS FILES FROM TMP TO DIST
	// --------------------------------------|
	gulp.task('copy', () => {
		var rootFiles = gulp.src(config.copy.src.files, {
				dot: true
			})
			.pipe(gulp.dest(config.copy.dest.prod));

		var scriptFiles = gulp.src(config.copy.src.js)
			.pipe(gulp.dest(config.copy.dest.dev));

		// Merge streams
		merge(rootFiles, scriptFiles);
	});
};
