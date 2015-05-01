// -----------------------------------------------------------------|
// COPY TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, merge) {

	// COPY ALL ROOT FILES + DEV JS FILES FROM TMP TO DIST
	// --------------------------------------|
	gulp.task('copy', function() {
		var rootFiles = gulp.src([
				'app/*.*',
				'!app/**/*.html',
				'!app/**/*.jade'
			], {
				dot: true
			})
			.pipe(gulp.dest('dist'));

		var scriptFiles = gulp.src([
				'app/js/**/*.js'
			])
			.pipe(gulp.dest('dist/dev/js'));

		// Merge streams
		merge(rootFiles, scriptFiles);
	});
};
