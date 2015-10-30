// -----------------------------------------------------------------|
// LINT TASKS
// -----------------------------------------------------------------|

export default (gulp, $, handleError, reload, config) => {

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

	// ARIALINT (ACCESSIBILITY LINTING)
	// --------------------------------------|
	gulp.task('lint:aria', () => {
		// Lint our HTML files for accessibility errors
		return gulp.src(config.linthtml.src)
			.pipe($.a11y())
    		.pipe($.a11y.reporter());
	});

	// LINT TESTS
	// --------------------------------------|
	gulp.task('lint:test', () => {
		// Lint our test spec files
		return gulp.src(config.lintscripts.src.test)
			.pipe(reload({
				stream: true,
				once: true
			}))
			.pipe($.eslint({
				env: {
					mocha: true
				}
			}))
			.pipe($.eslint.format())
			.pipe($.eslint.format('stylish', $.notify.onError('ESLint failed!\nSee console for details')))
			.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
	});
};
