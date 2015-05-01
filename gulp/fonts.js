// -----------------------------------------------------------------|
// FONTS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp) {

	// DEVELOPMENT FONTS
	// --------------------------------------|
	gulp.task('fonts:dev', function() {
		return gulp.src(require('main-bower-files')({
				filter: '**/*.{eot,svg,ttf,woff,woff2}'
			}).concat('app/css/fonts/**/*'))
			.pipe(gulp.dest('.tmp/css/fonts'));
	});

	// PRODUCTION FONTS
	// --------------------------------------|
	gulp.task('fonts:prod', function() {
		return gulp.src(require('main-bower-files')({
				filter: '**/*.{eot,svg,ttf,woff,woff2}'
			}).concat('app/css/fonts/**/*'))
			.pipe(gulp.dest('dist/css/fonts'));
	});
};
