// -----------------------------------------------------------------|
// SCRIPTS TASKS
// -----------------------------------------------------------------|

export default (gulp, $, merge, config) => {

	// INDIVIDUAL TASK: SCRIPTS
	// --------------------------------------|
	gulp.task('task:scripts', ['clean:scripts', 'lint:scripts'], () => {
		// Uglify
		// Copy to dist/js
		let scripts = gulp.src(config.scripts.src.js)
			.pipe($.concat('app.js'))
			.pipe($.uglify())
			.pipe(gulp.dest(config.scripts.dest.prod));

		// Copy to dist/dev/js
		let scriptsDev = gulp.src(config.scripts.src.js)
			.pipe($.if(global.devEnv, gulp.dest(config.scripts.dest.dev)));

		return merge(scripts, scriptsDev);
	});
};
