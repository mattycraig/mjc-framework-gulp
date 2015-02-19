/* jshint node:true */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cmq = require('gulp-combine-media-queries');
var lazypipe = require('lazypipe');
var scsslint = require('gulp-scss-lint');
var $ = require('gulp-load-plugins')();

// -----------------------------------------------------------------|
// GULP TASK STATISTICS
// -----------------------------------------------------------------|
// require('gulp-stats')(gulp);

// -----------------------------------------------------------------|
// ERROR NOTIFICATIONS
// -----------------------------------------------------------------|
function handleError(task){
	return function(err) {
		$.util.log($.util.colors.red(err));
		$.notify.onError(task + ' failed!')(err);
		this.emit('end');
	};
};

// -----------------------------------------------------------------|
// STYLES (LIBSASS [NODESASS] + COMBINE MQ + AUTOPREFIXER + SOURCEMAPS)
// -----------------------------------------------------------------|
gulp.task('styles', function () {

	// Sass Options
	var optsSass = {
		outputStyle: 'nested', // libsass doesn't support expanded yet
		precision: 10,
		includePaths: ['.'],
		onError: console.error.bind(console, 'Sass error:')
	}

	// Autoprefixer Options
	var optsAutoprefixer = {
		browsers: [
			'> 1%',
			'last 2 versions',
			'Firefox ESR',
			'Opera 12.1',
			'ie 9',
			'Safari 6'
		]
	}

	// Sourcemap + will be minified (.tmp)
	gulp.src('app/css/**/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass(optsSass))
		.on('error', handleError('Sass'))
		.pipe($.autoprefixer(optsAutoprefixer))
		.pipe(cmq())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('.tmp/css'))
		.pipe(reload({
			stream: true
		}));

	// Unminified + no sourcemap (dist)
	gulp.src('app/css/**/*.scss')
		.pipe($.plumber())
		.pipe($.sass(optsSass))
		.pipe($.autoprefixer(optsAutoprefixer))
		.pipe(cmq())
		.pipe($.rename({
			extname: '.unmin.css'
		}))
		.pipe(gulp.dest('dist/css/dev'));
});

// -----------------------------------------------------------------|
// VIEWS (COMPILE OUR JADE VIEWS + HTMLHINT)
// -----------------------------------------------------------------|
gulp.task('views', function () {
	return gulp.src('app/jade/*.jade')
		.pipe($.jade({
			pretty: true,
			basedir: 'app/jade',
		}))
		.pipe(gulp.dest('.tmp'))
		.on('error', handleError('Jade'))
		.pipe($.htmlhint())
		.pipe($.htmlhint.reporter())
		.on('error', handleError('HTML Hint'));
});

// -----------------------------------------------------------------|
// SCSS-LINT (LINT OUR SCSS FILES)
// -----------------------------------------------------------------|
gulp.task('scss-lint', function() {
	gulp.src([
			'app/css/**/*.scss',
			'!app/css/vendor/*.scss'
		])
		.pipe(scsslint({
			'config': '.scss-lint.yml',
			'endless': true
		}))
		.on('error', handleError('SCSS Lint'));
});

// -----------------------------------------------------------------|
// JSHINT (LINT OUR JS)
// -----------------------------------------------------------------|
gulp.task('jshint', function () {
	return gulp.src('app/js/**/*.js')
		.pipe(reload({
			stream: true,
			once: true
		}))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
		.on('error', handleError('JSHint'));
});

// -----------------------------------------------------------------|
// HTML (MINIFY CSS, MINIFY JS
// -----------------------------------------------------------------|
var cssChannel = lazypipe()
	.pipe($.csso)
	.pipe($.replace, '../bower_components/font-awesome/fonts', 'fonts/font-awesome');
var assets = $.useref.assets({searchPath: '{.tmp,app}'});

gulp.task('html', ['views', 'styles'], function () {
	return gulp.src(['app/*.html', '.tmp/*.html'])
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', cssChannel()))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('dist'));
});

// -----------------------------------------------------------------|
// HTMLFLAT (MINIFY CSS, MINIFY JS, MINIFY HTML, ASSET REVISION)
// -----------------------------------------------------------------|
gulp.task('htmlFlat', ['views', 'styles'], function () {
	return gulp.src(['app/*.html', '.tmp/*.html'])
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', cssChannel()))
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

// -----------------------------------------------------------------|
// IMAGES (MINIFY OUR IMAGES + CREATE RESPONSIVE IMAGES)
// -----------------------------------------------------------------|
gulp.task('images', function () {
	return gulp.src('app/images/**/*{jpg,gif,png}')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{
				cleanupIDs: false
			}]
		})))
		.pipe(gulp.dest('dist/images'));

	// Responsive images - needs more research
	// gulp.src('app/images/**/*.{jpg,gif,png}')
	// 	.pipe($.responsive([{
	// 		'*.{jpg,gif,png}' : [{
	// 			width: 320,
	// 			rename: {
	// 				suffix: "-sm"
	// 			}
	// 		}, {
	// 			width: 640,
	// 			rename: {
	// 				suffix: "-md"
	// 			}
	// 		}, {
	// 			width: 1024,
	// 			rename: {
	// 				suffix: "-lg"
	// 			}
	// 		}, {
	// 			width: 1800,
	// 			rename: {
	// 				suffix: "-lgst"
	// 			}
	// 		}]
	// 	}]))
	// 	.pipe(gulp.dest('dist/images/resp'));
});

// -----------------------------------------------------------------|
// FONTS (BOWER FONTS + CUSTOM APP FONTS)
// -----------------------------------------------------------------|
gulp.task('fonts', function () {
	gulp.src(require('main-bower-files')())
		.pipe($.filter([
			'**/*.{eot,svg,ttf,woff,woff2}',
			'!glyphicons-halflings-regular.{eot,svg,ttf,woff,woff2}'
		]))
		.pipe($.flatten())
		.pipe(gulp.dest('dist/css/fonts/font-awesome'));

	gulp.src('app/css/fonts/**/*')
		.pipe(gulp.dest('dist/css/fonts'));
});

// -----------------------------------------------------------------|
// EXTRAS (COPY)
// -----------------------------------------------------------------|
gulp.task('extras', function () {

	// Copy all root assets
	gulp.src([
			'app/*.*',
			'!app/**/*.html',
			'!app/**/*.jade',
			'node_modules/apache-server-configs/dist/.htaccess'
		], {
			dot: true
		})
		.pipe(gulp.dest('dist'));

	// Create unminfied JS files
	gulp.src([
			'app/js/**/*.js'
		], {
			dot: true
		})
		.pipe($.rename({
			extname: '.unmin.js'
		}))
		.pipe(gulp.dest('dist/js/dev'));
});

// -----------------------------------------------------------------|
// CLEAN AND START FRESH!
// -----------------------------------------------------------------|
gulp.task('clean', require('del').bind(null, [
	'.tmp',
	'dist'
]));

// -----------------------------------------------------------------|
// SERVE (START LOCAL SERVER + BROWSERSYNC + WATCH)
// -----------------------------------------------------------------|
gulp.task('serve', ['styles', 'views', 'fonts'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	// watch for changes
	gulp.watch([
		'app/*.html',
		'.tmp/*.html',
		'app/js/**/*.js',
		'app/images/**/*'
	]).on('change', reload);

	gulp.watch('app/css/**/*.scss', ['styles']);
	gulp.watch('app/js/**/*.js', ['jshint']);
	gulp.watch('app/jade/**/*.jade', ['views']);
	gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
});

// -----------------------------------------------------------------|
// SERVE:DIST (SERVE UP OUR DIST FOLDER)
// -----------------------------------------------------------------|
gulp.task('serve:dist', ['styles', 'views', 'fonts'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

// -----------------------------------------------------------------|
// WIREDEP (INJECT BOWER COMPONENTS)
// -----------------------------------------------------------------|
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;

	gulp.src('app/jade/**/*.jade')
		.pipe(wiredep({
			exclude: [
				// 'bootstrap-sass-official',
				// 'modernizr'
			],
			ignorePath: '../../../../'
		}))
		.pipe(gulp.dest('app/jade'))
		.on('error', handleError('Wiredep'));
});

// -----------------------------------------------------------------|
// BUILD (FOR CMS INTEGRATION)
// -----------------------------------------------------------------|
gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

// -----------------------------------------------------------------|
// BUILD (FLAT)
// -----------------------------------------------------------------|
gulp.task('build-flat', ['jshint', 'htmlFlat', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build-flat', gzip: true}));
});

// -----------------------------------------------------------------|
// DEFAULT
// -----------------------------------------------------------------|
gulp.task('default', ['clean'], function () {
	gulp.start('build');
});

// -----------------------------------------------------------------|
// TODO
// -----------------------------------------------------------------|
// gulp-responsive
