// -----------------------------------------------------------------|
// HTML TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, merge) {

	// ASSETS OPTIONS
	// --------------------------------------|
	var assets = $.useref.assets({
			searchPath: '{.tmp,app}'
		});

	// PRODUCTION HTML (UNMINIFIED / WITH CMS)
	// --------------------------------------|
	gulp.task('html:prod', ['views:prod', 'styles:prod'], function() {
		var doUseref = gulp.src([
				'.tmp/*.html',
				'!.tmp/index.html'
			])
			.pipe($.useref())
			.pipe(gulp.dest('dist'));

		// Reduces compile time but only searches index file to
		// minify and concat css/js references
		var doAssets = gulp.src('.tmp/index.html')
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.csso()))
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe(gulp.dest('dist'));

		// Merge streams
		return merge(doUseref, doAssets);
	});

	// FLAT HTML (MINIFIED / NO CMS)
	// --------------------------------------|
	gulp.task('html:flat', ['views:prod', 'styles:prod'], function() {
		return gulp.src([
				'.tmp/**/*.html'
			])
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.csso()))
			.pipe($.rev())
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe($.revReplace())
			.pipe($.if('*.html', $.minifyHtml({
				conditionals: true,
				loose: true
			})))
			.pipe(gulp.dest('dist'));
	});
};
