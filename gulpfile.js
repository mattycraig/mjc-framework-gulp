/* jshint node:true */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jadeInheritance = require('gulp-jade-inheritance');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();

// -----------------------------------------------------------------|
// ERROR NOTIFICATIONS
// -----------------------------------------------------------------|
function handleError(task){
	return function(err) {
		$.util.log(err.message);
		if ( task === 'SASS') {
			// SASS errors
			$.notify.onError({
				message: task + ' failed!\n<%= error.message %>'
			})(err);
		} else {
			// All other errors
			$.notify.onError(task + ' failed!')(err);
		}
		this.emit('end');
	};
};

// -----------------------------------------------------------------|
// STYLES (LIBSASS + COMBINE MQ + AUTOPREFIXER + SOURCEMAPS)
// -----------------------------------------------------------------|
gulp.task('styles', function () {

	// Sass Options
	var optsSass = {
		outputStyle: 'nested', // libsass doesn't support expanded yet
		precision: 10,
		// includePaths: ['.'] // This causes issues...
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

	// PostCSS Options
	var optsPostCSS = [
		require('autoprefixer-core')(optsAutoprefixer),
		require('postcss-zindex'),
		require('css-mqpacker')
	];

	// Sourcemap + will be minified (.tmp)
	gulp.src([
			'app/css/**/*.scss'
		])
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass(optsSass))
		.on('error', handleError('SASS'))
		.pipe($.postcss(optsPostCSS))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('.tmp/css'))
		.pipe(reload({
			stream: true
		}));

	// Unminified + no sourcemap (dist)
	gulp.src([
			'app/css/**/*.scss'
		])
		.pipe($.plumber())
		.pipe($.sass(optsSass))
		.pipe($.postcss(optsPostCSS))
		.pipe($.rename({
			extname: '.unmin.css'
		}))
		.pipe(gulp.dest('dist/dev/css'));

	// Merge streams (doesnt work with plumber - look into this)
	// return merge(prod, dev);
});

// -----------------------------------------------------------------|
// VIEWS (COMPILE OUR JADE VIEWS)
// -----------------------------------------------------------------|

// Jade options
var optsJade = {
	pretty: true,
	basedir: 'app/jade'
}

// HTML Prettify options
var optsPretty = {
	indent_inner_html: true,
	preserve_newlines: true,
	indent_scripts: 'normal',
	unformatted: ['sub', 'sup', 'b', 'em', 'u']
}

gulp.task('views', function () {
	// Jade (only process changed files)
	return gulp.src([
			'app/jade/**/*.jade'
		])
		.pipe(changed('.tmp', {extension: '.html'}))
		.pipe(gulpif(global.isWatching, cached('jade')))
		.pipe(jadeInheritance({basedir: 'app/jade'}))
		.pipe($.filter([
			'*',
			'!app/jade/**/_*.jade'
		]))
		.pipe(jade(optsJade))
		.pipe($.prettify(optsPretty))
		.pipe(gulp.dest('.tmp'));
});

// Setwatch task is required for Jade caching
gulp.task('setWatch', function() {
	global.isWatching = true;
});

// -----------------------------------------------------------------|
// DIST VIEWS (COMPILE OUR JADE COMPONENTS + PARTIALS)
// -----------------------------------------------------------------|
gulp.task('viewsDist', function () {
	// Compile page partials
	var partials = gulp.src([
			'app/jade/layouts/default/partials/**/*.jade'
		])
		.pipe(jade(optsJade))
		.pipe($.prettify(optsPretty))
		.pipe(gulp.dest('dist/dev/partials'));

	// Compile page components
	var components = gulp.src([
			'app/jade/layouts/default/components/**/*.jade'
		])
		.pipe(jade(optsJade))
		.pipe($.prettify(optsPretty))
		.pipe(gulp.dest('dist/dev/components'));

	// Merge streams
	return merge(partials, components);
});

// -----------------------------------------------------------------|
// HTMLHINT (HTML LINTING)
// -----------------------------------------------------------------|
gulp.task('htmlHint', function () {
	return gulp.src([
			'.tmp/**/*.html'
		])
		.pipe($.htmlhint('.htmlhintrc'))
		.pipe($.htmlhint.reporter())
		.pipe($.htmlhint.reporter('fail'))
		.on('error', handleError('HTML Hint'));
});

// -----------------------------------------------------------------|
// ARIALINT (ACCESSIBILITY LINTING)
// -----------------------------------------------------------------|
gulp.task('ariaLint', function () {
	return gulp.src([
			'.tmp/**/*.html'
		])
		.pipe($.arialinter({
			level: 'A',
			rules: {
				uniqueSummaryAttr: false,
				tableHasSummary: false
			}
		}));
		// this doesnt work - todo
		// .on('error', handleError('ARIA Lint'));
});

// -----------------------------------------------------------------|
// SCRIPTS (JSHINT + JSCS)
// -----------------------------------------------------------------|
gulp.task('scripts', function () {
	return gulp.src([
			'app/js/**/*.js'
		])
		.pipe(reload({
			stream: true,
			once: true
		}))
		.pipe($.jscs())
		.on('error', handleError('JSCS'))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'))
		.on('error', handleError('JSHint'));
});

// -----------------------------------------------------------------|
// HTML (MINIFY CSS, MINIFY JS)
// -----------------------------------------------------------------|
var assets = $.useref.assets({searchPath: '{.tmp,app}'});

gulp.task('html', ['views', 'styles'], function () {
	var doUseref = gulp.src([
			'.tmp/*.html',
			'!.tmp/index.html'
		])
		.pipe($.useref())
		.pipe(gulp.dest('dist'));

	// Reduces compile time but only searches index file to minify and concat
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

// -----------------------------------------------------------------|
// HTMLFLAT (MINIFY CSS, MINIFY JS, MINIFY HTML, ASSET REVISION)
// -----------------------------------------------------------------|
gulp.task('htmlFlat', ['views', 'styles'], function () {
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

// -----------------------------------------------------------------|
// IMAGES (MINIFY OUR IMAGES + CREATE RESPONSIVE IMAGES)
// -----------------------------------------------------------------|
gulp.task('images', function () {
	return gulp.src('app/images/**/*')
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
	// 			width: 1280,
	// 			rename: {
	// 				suffix: "-lg"
	// 			}
	// 		}, {
	// 			width: 2560,
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
	return gulp.src(require('main-bower-files')({
			filter: '**/*.{eot,svg,ttf,woff,woff2}'
		}).concat('app/css/fonts/**/*'))
		.pipe(gulp.dest('.tmp/css/fonts'))
		.pipe(gulp.dest('dist/css/fonts'));
});

// -----------------------------------------------------------------|
// EXTRAS (COPY)
// -----------------------------------------------------------------|
gulp.task('extras', function () {

	// Copy all root assets
	var copyAssets = gulp.src([
			'app/*.*',
			'!app/**/*.html',
			'!app/**/*.jade',
			'node_modules/apache-server-configs/dist/.htaccess'
		], {
			dot: true
		})
		.pipe(gulp.dest('dist'));

	// Create unminfied JS files
	var unminJs = gulp.src([
			'app/js/**/*.js'
		])
		.pipe($.rename({
			extname: '.unmin.js'
		}))
		.pipe(gulp.dest('dist/dev/js'));

	// Merge streams
	return merge(copyAssets, unminJs);
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
gulp.task('serve', ['styles', 'setWatch', 'views', 'htmlHint', 'ariaLint', 'fonts', 'scripts'], function () {
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
		'.tmp/**/*.html',
		'app/js/**/*.js',
		'app/images/**/*'
	]).on('change', reload);

	gulp.watch('.tmp/**/*.html', ['htmlHint', 'ariaLint']);
	gulp.watch('app/css/**/*.scss', ['styles']);
	gulp.watch('app/js/**/*.js', ['scripts']);
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

	return gulp.src('app/jade/**/*.jade')
		.pipe(wiredep({
			exclude: [
				'bootstrap-sass-official/assets/javascripts/bootstrap.js',
				'outdated-browser/outdatedbrowser/outdatedbrowser.min.js'
				// 'modernizr'
			],
			ignorePath: '../../../../'
		}))
		.pipe(gulp.dest('app/jade'));
});

// -----------------------------------------------------------------|
// BUILD (FOR CMS INTEGRATION)
// -----------------------------------------------------------------|
var s = $.size();

gulp.task('build', ['scripts', 'html', 'images', 'fonts', 'extras', 'viewsDist'], function () {
	return gulp.src('dist/**/*')
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function () {
				return 'Build complete (' + s.prettySize + ')';
			}
		}));
});

// -----------------------------------------------------------------|
// BUILD (FLAT)
// -----------------------------------------------------------------|
gulp.task('build:flat', ['scripts', 'htmlFlat', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*')
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function () {
				return 'Build complete (' + s.prettySize + ')';
			}
		}));
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
// responsive images (gulp-responsive)
// add testing framework (jasmine/mocha)
