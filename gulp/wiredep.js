// -----------------------------------------------------------------|
// WIREDEP TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, config) => {

	// INJECT VENDOR DEPENDENCIES
	// --------------------------------------|
	gulp.task('wiredep', () => {
		var wiredep = require('wiredep').stream;

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
};
