// -----------------------------------------------------------------|
// FONTS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, config) => {

	// DEVELOPMENT FONTS
	// --------------------------------------|
	gulp.task('fonts:dev', () => {
		return gulp.src(require('main-bower-files')({
				filter: config.fonts.src.filter
			}).concat(config.fonts.src.concat))
			.pipe(gulp.dest(config.fonts.dest.dev));
	});

	// PRODUCTION FONTS
	// --------------------------------------|
	gulp.task('fonts:prod', () => {
		return gulp.src(require('main-bower-files')({
				filter: config.fonts.src.filter
			}).concat(config.fonts.src.concat))
			.pipe(gulp.dest(config.fonts.dest.prod));
	});
};
