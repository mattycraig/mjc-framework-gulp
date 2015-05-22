// -----------------------------------------------------------------|
// WIREDEP TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, config) {

	// INJECT VENDOR DEPENDENCIES
	// --------------------------------------|
	gulp.task('wiredep', function() {
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
