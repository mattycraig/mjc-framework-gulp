// -----------------------------------------------------------------|
// FONTS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, config) {

	// DEVELOPMENT FONTS
	// --------------------------------------|
	gulp.task('fonts:dev', function() {
		return gulp.src(require('main-bower-files')({
				filter: config.fonts.src.filter
			}).concat(config.fonts.src.concat))
			.pipe(gulp.dest(config.fonts.dest.dev));
	});

	// PRODUCTION FONTS
	// --------------------------------------|
	gulp.task('fonts:prod', function() {
		return gulp.src(require('main-bower-files')({
				filter: config.fonts.src.filter
			}).concat(config.fonts.src.filter))
			.pipe(gulp.dest(config.fonts.dest.prod));
	});
};
