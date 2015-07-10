// -----------------------------------------------------------------|
// LINT HTML TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, handleError, config) => {

	// HTMLHINT (HTML LINTING)
	// --------------------------------------|
	gulp.task('lint:html', () => {

		// Lint our HTML files for errors
		return gulp.src(config.linthtml.src)
			.pipe($.htmlhint('.htmlhintrc'))
			.pipe($.htmlhint.reporter())
			.pipe($.htmlhint.reporter('fail'))
			.on('error', handleError('HTML Hint'));
	});

	// ARIALINT (ACCESSIBILITY LINTING)
	// --------------------------------------|
	// Unfortunetly broken with latest version of node =\

	// gulp.task('lint:aria', () => {

	// 	// Lint our HTML files for accessbility errors
	// 	return gulp.src(config.linthtml.src)
	// 		.pipe($.arialinter({
	// 			level: 'A',
	// 			rules: {
	// 				uniqueSummaryAttr: false,
	// 				tableHasSummary: false
	// 			}
	// 		}));
	// });
};
