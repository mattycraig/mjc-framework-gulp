// -----------------------------------------------------------------|
// VIEWS TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, reload, config) => {

	// JADE OPTIONS
	// --------------------------------------|
	let optsJade = {
		pretty: true,
		basedir: 'app/jade'
	};

	let requireUncached = (module) => {
	    delete require.cache[require.resolve(module)];
	    return require(module);
	}

	// HTML PRETTIFY OPTIONS
	// --------------------------------------|
	let optsPretty = {
		indent_with_tabs: true,
		indent_inner_html: false,
		preserve_newlines: true,
		indent_scripts: 'normal',
		unformatted: ['sub', 'sup', 'b', 'em', 'u', 'script']
	};

	// DEVELOPMENT VIEWS
	// --------------------------------------|
	// Process on initial serve & when config.json changes
	gulp.task('views:dev', ['json:views'], () => {
		return gulp.src(config.views.src.dev)
			.pipe($.data(function(file) {
				return requireUncached('../app/json/__output.json');
			}))
			.pipe($.filter(config.views.src.filter))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp))
			.pipe(reload({stream: true}));
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
			.pipe($.data(function(file) {
				return requireUncached('../app/json/__output.json');
			}))
			.pipe($.filter(config.views.src.filter))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp))
			.pipe(reload({stream: true}));
	});

	// PRODUCTION VIEWS
	// --------------------------------------|
	gulp.task('views:prod', ['wiredep', 'json:views'], () => {

		// Compile page templates
		let templates = gulp.src(config.views.src.prod)
			.pipe($.data(function(file) {
				return requireUncached('../app/json/__output.json');
			}))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe(gulp.dest(config.views.dest.tmp));

		// Compile page components for dev
		let components = gulp.src(config.views.src.components)
			.pipe($.data(function(file) {
				return requireUncached('../app/json/__output.json');
			}))
			.pipe($.jade(optsJade))
			.pipe($.prettify(optsPretty))
			.pipe($.if(global.devEnv, gulp.dest(config.views.dest.components)));

		return merge(templates, components);

	});
};
