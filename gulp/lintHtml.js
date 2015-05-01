// -----------------------------------------------------------------|
// LINT HTML TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, handleError) {

	// HTMLHINT (HTML LINTING)
	// --------------------------------------|
	gulp.task('lint:html', function() {

		// Lint our HTML files for errors
		return gulp.src([
				'.tmp/**/*.html'
			])
			.pipe($.htmlhint('.htmlhintrc'))
			.pipe($.htmlhint.reporter())
			.pipe($.htmlhint.reporter('fail'))
			.on('error', handleError('HTML Hint'));
	});

	// ARIALINT (ACCESSIBILITY LINTING)
	// --------------------------------------|
	gulp.task('lint:aria', function() {

		// Lint our HTML files for accessbility errors
		return gulp.src([
				'.tmp/**/*.html'
			])
			.pipe($.arialinter({
				level: 'A',
				rules: {
					uniqueSummaryAttr: false,
					tableHasSummary: false
				}
			}));
	});
};
