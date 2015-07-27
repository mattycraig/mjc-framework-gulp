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
	gulp.task('views:dev', () => {
		var destPathExists = false;
		try { destPathExists = fs.statSync(config.views.dest.tmp).isDirectory(); } catch (ex) {}

		return gulp.src(config.views.src.dev)
			.pipe($.changed('.tmp', {extension: '.html'}))
			.pipe($.if(global.isWatching, $.cached('jade')))
			.pipe($.if(destPathExists, $.jadeInheritance({basedir: 'app/jade'})))
			.pipe($.filter(config.views.src.filter))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp))
			.pipe(reload({
				stream: true
			}));
	});

	// Setwatch task is required for Jade caching
	gulp.task('setWatch', () => {
		global.isWatching = true;
	});

	// PRODUCTION VIEWS
	// --------------------------------------|
	gulp.task('views:prod', () => {

		// Compile page templates
		var templates = gulp.src(config.views.src.prod)
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp));

		// Compile page partials for dev
		var partials = gulp.src(config.views.src.partials)
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.partials));

		// Compile page components for dev
		var components = gulp.src(config.views.src.components)
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.components));

		// Merge streams
		return merge(templates, partials, components);
	});
};
