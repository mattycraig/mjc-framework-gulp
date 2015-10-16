// -----------------------------------------------------------------|
// SCRIPTS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function(gulp, $, merge, config) {

	// INDIVIDUAL TASK: SCRIPTS
	// --------------------------------------|
	gulp.task('task:scripts', ['clean:scripts', 'lint:scripts'], () => {

		// Lint scripts
		// Uglify
		// Copy to dist/js
		var scripts = gulp.src(config.scripts.src.js)
			.pipe($.concat('app.js'))
			.pipe($.uglify())
			.pipe(gulp.dest(config.scripts.dest.prod));

		// Lint scripts
		// Copy to dist/dev/js
		var scriptsDev = gulp.src(config.scripts.src.js)
			.pipe($.if(global.devEnv, gulp.dest(config.scripts.dest.dev)));

		return merge(scripts, scriptsDev);

	});
};
