// -----------------------------------------------------------------|
// FONTS TASKS
// -----------------------------------------------------------------|

export default (gulp, config) => {

	let fonts = (dest) => {
		return gulp.src(require('main-bower-files')({
				filter: config.fonts.src.filter
			}).concat(config.fonts.src.concat))
			.pipe(gulp.dest(dest));
	}

	// DEVELOPMENT FONTS
	// --------------------------------------|
	gulp.task('fonts:dev', () => {
		fonts(config.fonts.dest.dev);
	});

	// PRODUCTION FONTS
	// --------------------------------------|
	gulp.task('fonts:prod', () => {
		fonts(config.fonts.dest.prod);
	});
};
