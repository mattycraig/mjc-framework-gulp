// -----------------------------------------------------------------|
// HTML TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, config) => {

	// USEREF OPTIONS
	// --------------------------------------|
	let assets = $.useref({
		searchPath: '{.tmp,app}'
	});

	// PRODUCTION HTML (UNMINIFIED / WITH CMS)
	// --------------------------------------|
	gulp.task('html:prod', ['views:prod', 'styles:prod'], () => {
		return gulp.src(config.html.src.flat)
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.minifyCss()))
			.pipe(gulp.dest(config.html.dest.prod));
	});

	// FLAT HTML (MINIFIED / NO CMS)
	// --------------------------------------|
	gulp.task('html:flat', ['views:prod', 'styles:prod'], () => {
		return gulp.src(config.html.src.flat)
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.minifyCss()))
			.pipe($.rev())
			.pipe($.revReplace())
			.pipe($.if('*.html', $.minifyHtml({
				conditionals: true,
				loose: true
			})))
			.pipe(gulp.dest(config.html.dest.prod));
	});
};
