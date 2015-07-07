// -----------------------------------------------------------------|
// STYLES TASKS
// -----------------------------------------------------------------|
'use strict';

// LIBSASS OPTIONS
// --------------------------------------|
var optsSass = {
	outputStyle: 'expanded',
	precision: 10,
	includePaths: [
		'.',
		'app/scss/',
		'bower_components/',
		'bower_components/bourbon/app/assets/stylesheets/',
		'bower_components/bootstrap-sass-official/assets/stylesheets/',
		'bower_components/animate.css/source/'
	]
};

// AUTOPREFIXER OPTIONS
// --------------------------------------|
var optsCssNext = {
	browsers: [
		'> 1%',
		'last 2 versions',
		'Firefox ESR',
		'Opera 12.1',
		'Explorer >= 9',
		'Safari >= 6',
		'ExplorerMobile >= 10'
	],
	features: {
		rem: false
	}
};

// POSTCSS OPTIONS
// --------------------------------------|
var optsPostCSS = [
	require('cssnext')(optsCssNext),
	require('css-mqpacker')
];

module.exports = function (gulp, $, reload, merge, config) {

	// DEVELOPMENT STYLES
	// --------------------------------------|
	gulp.task('styles:dev', function() {
		// Automatically import scss files
		// Init our souremaps
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
	gulp.task('styles:prod', function() {
		// Automatically import scss files
		// Init our souremaps
		// Compile our scss files
		// Use PostCSS
		// Write our sourcemap
		// Output to our .tmp folder
		// Output to our dist/dev/css folder
		var styles = gulp.src(config.styles.src.scss)
			.pipe($.sassBulkImport())
			.pipe($.sourcemaps.init())
			.pipe($.sass.sync(optsSass))
			.pipe($.postcss(optsPostCSS))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest(config.styles.dest.tmp))
			.pipe(gulp.dest(config.styles.dest.dev));

		// Copy sourcemap to dist/dev/css folder
		var sourcemap = gulp.src(config.styles.src.map)
			.pipe(gulp.dest(config.styles.dest.dev));

		// Merge streams
		return merge(styles, sourcemap);
	});
};
