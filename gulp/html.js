// -----------------------------------------------------------------|
// HTML TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function(gulp, $, merge, config) {

	// ASSETS OPTIONS
	// --------------------------------------|
	var assets = $.useref.assets({
		searchPath: '{.tmp,app}'
	});

	// PRODUCTION HTML (UNMINIFIED / WITH CMS)
	// --------------------------------------|
	gulp.task('html:prod', ['views:prod', 'styles:prod'], () => {
		var doUseref = gulp.src(config.html.src.prod)
			.pipe($.useref())
			.pipe(gulp.dest(config.html.dest.prod));

		// Reduces compile time but only searches index file to
		// minify and concat css/js references
		var doAssets = gulp.src(config.html.src.index)
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
