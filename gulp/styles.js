// -----------------------------------------------------------------|
// STYLES TASKS
// -----------------------------------------------------------------|

export default (gulp, $, reload, merge, config) => {

	// LIBSASS OPTIONS
	// --------------------------------------|
	let optsSass = {
		outputStyle: 'expanded',
		precision: 10,
		includePaths: [
			'.',
			'app/scss/',
			'bower_components/',
			'bower_components/bourbon/app/assets/stylesheets/',
			'bower_components/bootstrap-sass-official/assets/stylesheets/',
			'bower_components/animate.css-scss/'
		]
	};

	// AUTOPREFIXER OPTIONS
	// --------------------------------------|
	let optsAutoprefixer = {
		browsers: [
			'> 1%',
			'last 2 versions',
			'Firefox ESR',
			'Opera 12.1',
			'Explorer >= 9',
			'Safari >= 6',
			'ExplorerMobile >= 10'
		]
	};

	// POSTCSS OPTIONS
	// --------------------------------------|
	let optsPostCSS = [
		require('autoprefixer')(optsAutoprefixer),
		require('css-mqpacker')
	];

	// DEVELOPMENT STYLES
	// --------------------------------------|
	gulp.task('styles:dev', ['json:styles'], () => {
		// Automatically import scss files
		// Init our sourcemaps
		// Compile our scss files
		// Use PostCSS
		// Write our sourcemap
		// Output to our .tmp folder
		// Reload browser
		// NOTE: Can't return stream here as sass errors prevent watch task
		gulp.src(config.styles.src.scss)
			.pipe($.sassBulkImport())
			.pipe($.sourcemaps.init())
			.pipe($.sass.sync(optsSass))
			.on('error', function(err) {
				$.notify.onError({
					message: 'SASS failed!\n' + err.message + ' on line ' + err.line
				})(err);
			})
			.pipe($.postcss(optsPostCSS))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest(config.styles.dest.tmp))
			.pipe(reload({
				stream: true
			}));
	});

	// PRODUCTION STYLES
	// --------------------------------------|
	gulp.task('styles:prod', ['json:styles'], () => {
		// Automatically import scss files
		// Init our sourcemaps
		// Compile our scss files
		// Use PostCSS
		// Write our sourcemap
		// Output to our .tmp folder
		// Output to our dist/dev/css folder
		let styles = gulp.src(config.styles.src.scss)
			.pipe($.sassBulkImport())
			.pipe($.sourcemaps.init())
			.pipe($.sass.sync(optsSass))
			.pipe($.postcss(optsPostCSS))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest(config.styles.dest.tmp))
			.pipe($.if(global.devEnv, gulp.dest(config.styles.dest.dev)));

		// Copy sourcemap to dist/dev/css folder
		let sourcemap = gulp.src(config.styles.src.map)
			.pipe($.if(global.devEnv, gulp.dest(config.styles.dest.dev)));

		return merge(styles, sourcemap);
	});

	// INDIVIDUAL TASK: STYLES
	// --------------------------------------|
	gulp.task('task:styles', ['json:styles', 'clean:styles'], () => {

		let styles = () => {
			// Automatically import scss files
			// Compile our scss files
			// Use PostCSS
			// Minify CSS
			// Output to our dist/css folder
			return gulp.src(config.styles.src.scss)
				.pipe($.sassBulkImport())
				.pipe($.sass.sync(optsSass))
				.on('error', function(err) {
					$.notify.onError({
						message: 'SASS failed!\n' + err.message + ' on line ' + err.line
					})(err);
				})
				.pipe($.postcss(optsPostCSS))
				.pipe($.minifyCss())
				.pipe(gulp.dest(config.styles.dest.prod));
		}

		if(global.devEnv) {
			let doStyles = styles();
			let sourcemap = gulp.src(config.styles.src.scss)
				.pipe($.sassBulkImport())
				.pipe($.sourcemaps.init())
				.pipe($.sass.sync(optsSass))
				.pipe($.postcss(optsPostCSS))
				.pipe($.sourcemaps.write('./'))
				.pipe(gulp.dest(config.styles.dest.dev));
			return merge(doStyles, sourcemap);
		} else {
			styles();
		}

	});
};
