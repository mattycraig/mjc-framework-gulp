// -----------------------------------------------------------------|
// WIREDEP TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp) {

	// INJECT VENDOR DEPENDENCIES
	// --------------------------------------|
	gulp.task('wiredep', function() {
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
};
