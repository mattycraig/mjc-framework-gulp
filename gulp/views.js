// -----------------------------------------------------------------|
// VIEWS TASKS
// -----------------------------------------------------------------|
'use strict';

// JADE OPTIONS
// --------------------------------------|
var optsJade = {
	pretty: true,
	basedir: 'app/jade'
};

// HTML PRETTIFY OPTIONS
// --------------------------------------|
var optsPretty = {
	indent_inner_html: false,
	preserve_newlines: true,
	indent_scripts: 'normal',
	unformatted: ['sub', 'sup', 'b', 'em', 'u']
};

module.exports = function (gulp, $, merge) {

	// DEVELOPMENT VIEWS
	// --------------------------------------|
	gulp.task('views:dev', function() {
		return gulp.src([
				'app/jade/**/*.jade'
			])
			.pipe($.changed('.tmp', {extension: '.html'}))
			.pipe($.if(global.isWatching, $.cached('jade')))
			.pipe($.jadeInheritance({basedir: 'app/jade'}))
			.pipe($.filter([
				'*',
				'!app/jade/**/_*.jade'
			]))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest('.tmp'));
	});

	// Setwatch task is required for Jade caching
	gulp.task('setWatch', function() {
		global.isWatching = true;
	});

	// PRODUCTION VIEWS
	// --------------------------------------|
	gulp.task('views:prod', function() {

		// Compile page templates
		var templates = gulp.src([
				'app/jade/**/*.jade',
				'!app/jade/**/_*.jade'
			])
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			// Have to do this as it causes issues for the moment
			.pipe($.replace('<!-- bower:js-->', ''))
			.pipe($.replace('<!-- endbower-->', ''))
			.pipe(gulp.dest('.tmp'));

		// Compile page partials for dev
		var partials = gulp.src([
				'app/jade/layouts/default/partials/**/*.jade'
			])
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest('dist/dev/partials'));

		// Compile page components for dev
		var components = gulp.src([
				'app/jade/layouts/default/components/**/*.jade'
			])
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest('dist/dev/components'));

		// Merge streams
		return merge(templates, partials, components);
	});
};
