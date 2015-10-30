// -----------------------------------------------------------------|
// HELPERS TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, config) => {

	let clean = (name, paths) => {
		gulp.task(name, require('del').bind(null, paths));
	}

	// CLEAN TMP + DIST FOLDERS + OUTPUT JSON
	// --------------------------------------|
	clean('clean', config.clean.tmp);

	// CLEAN CSS + DEV CSS FOLDERS
	// --------------------------------------|
	clean('clean:styles', config.clean.styles);

	// CLEAN JS + DEV JS FOLDERS
	// --------------------------------------|
	clean('clean:scripts', config.clean.scripts);

	// CLEAN JSON OUTPUT
	// --------------------------------------|
	clean('clean:json', config.clean.json);

	// INJECT BOWER DEPENDENCIES
	// --------------------------------------|
	gulp.task('wiredep', ['inject:scripts'], () => {
		let wiredep = require('wiredep').stream;

		return gulp.src(config.wiredep.src)
			.pipe(wiredep({
				exclude: [
					'bootstrap-sass-official/assets/javascripts/bootstrap.js',
					'outdated-browser/outdatedbrowser/outdatedbrowser.min.js'
					// 'modernizr'
				],
				ignorePath: '../../../../'
			}))
			.pipe(gulp.dest(config.wiredep.dest));
	});

	// COPY ALL ROOT FILES + DEV JS FILES FROM TMP TO DIST
	// --------------------------------------|
	gulp.task('copy', () => {

		// Root files
		let rootFiles = gulp.src(config.copy.src.files, {
				dot: true
			})
			.pipe(gulp.dest(config.copy.dest.prod));

		// Script files
		let scriptFiles = gulp.src(config.copy.src.js)
			.pipe($.if(global.devEnv, gulp.dest(config.copy.dest.dev)));

		return merge(rootFiles, scriptFiles);
	});
};
