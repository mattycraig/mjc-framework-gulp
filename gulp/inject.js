// -----------------------------------------------------------------|
// INJECT TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, config) => {

	let inject = (src, injectSrc, ignorePath, dest) => {
		return gulp.src(src)
			.pipe($.inject(gulp.src(injectSrc, {read: false}),
				{
					ignorePath: ignorePath,
					relative: false,
					addRootSlash: false
				}
			))
			.pipe(gulp.dest(dest));
	}

	// INJECT SCRIPTS
	// --------------------------------------|
	gulp.task('inject:scripts', () => {
		// Inject our script tags into our jade foot partial
		inject(config.inject.scripts.jade, config.inject.scripts.src, config.inject.scripts.ignore, config.inject.scripts.dest);
	});

	// INJECT DEVOPTS
	// --------------------------------------|
	gulp.task('setDevopts', () => {
		global.devOpts = true;
	});

	gulp.task('inject:devopts', ['setDevopts'], () => {
		// Inject devOpts into our layout (easy page navigation)
		return gulp.src(config.inject.devopts.jade)
				.pipe($.inject(gulp.src(config.inject.devopts.src, {read: false}),
					{
						ignorePath: config.inject.devopts.ignore,
						relative: false,
						addRootSlash: false,
						transform: function (filepath) {
							return 'li: a(href="' + filepath.slice(0, -5) + '.html") ' + filepath.slice(0, -5);
						}
					}
				))
				.pipe(gulp.dest(config.inject.devopts.dest));
	});

	// INJECT SCRIPTS FOR TESTS
	// --------------------------------------|
	gulp.task('inject:tests', () => {
		// Inject our script tags into our test index.html file
		inject(config.inject.tests.test, config.inject.tests.src, config.inject.tests.ignore, config.inject.tests.dest);
	});
};
