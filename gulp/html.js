// -----------------------------------------------------------------|
// HTML TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, config) => {

	// ASSETS OPTIONS
	// --------------------------------------|
	let assets = $.useref.assets({
		searchPath: '{.tmp,app}'
	});

	// PRODUCTION HTML (UNMINIFIED / WITH CMS)
	// --------------------------------------|
	gulp.task('html:prod', ['views:prod', 'styles:prod'], () => {
		let doUseref = gulp.src(config.html.src.prod)
			.pipe($.useref())
			.pipe(gulp.dest(config.html.dest.prod));

		// Reduces compile time but only searches index file to
		// minify and concat css/js references
		let doAssets = gulp.src(config.html.src.index)
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.minifyCss()))
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe(gulp.dest(config.html.dest.prod));

		// Merge streams
		return merge(doUseref, doAssets);
	});

	// FLAT HTML (MINIFIED / NO CMS)
	// --------------------------------------|
	gulp.task('html:flat', ['views:prod', 'styles:prod'], () => {
		return gulp.src(config.html.src.flat)
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.minifyCss()))
			.pipe($.rev())
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe($.revReplace())
			.pipe($.if('*.html', $.minifyHtml({
				conditionals: true,
				loose: true
			})))
			.pipe(gulp.dest(config.html.dest.prod));
	});
};
