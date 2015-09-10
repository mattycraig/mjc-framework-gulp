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
	indent_with_tabs: true,
	indent_inner_html: false,
	preserve_newlines: true,
	indent_scripts: 'normal',
	unformatted: ['sub', 'sup', 'b', 'em', 'u', 'script']
};

module.exports = (gulp, $, merge, reload, config) => {

	// DEVELOPMENT VIEWS
	// --------------------------------------|
	// Process on intial serve
	gulp.task('views:dev', ['inject:scripts'], () => {
		return gulp.src(config.views.src.dev)
			.pipe($.filter(config.views.src.filter))
			.pipe($.jade(optsJade))
			.pipe(gulp.dest(config.views.dest.tmp));
	});

	// Setwatch task is required for Jade caching
	gulp.task('setWatch', () => {
		global.isWatching = true;
	});

	// Only process changed jade files
	gulp.task('views:devWatch', () => {
		return gulp.src(config.views.src.dev)
			.pipe($.changed('.tmp', {extension: '.html'}))
			.pipe($.if(global.isWatching, $.cached('jade')))
			.pipe($.jadeInheritance({basedir: 'app/jade'}))
			.pipe($.filter(config.views.src.filter))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp));
	});

	// PRODUCTION VIEWS
	// --------------------------------------|
	gulp.task('views:prod', ['inject:scripts'], () => {

		// Compile page templates
		var templates = gulp.src(config.views.src.prod)
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp));

		// Compile page components for dev
		var components = gulp.src(config.views.src.components)
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe($.if(global.devEnv, gulp.dest(config.views.dest.components)));

		return merge(templates, components);

	});
};
