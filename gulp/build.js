// -----------------------------------------------------------------|
// BUILD TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, config) => {

	// BUILD (UNMINIFIED, WITH CMS)
	// --------------------------------------|
	gulp.task('build', ['lint:scripts', 'html:prod', 'images:minify', 'fonts:prod', 'copy'], () => {
		return gulp.src(config.build.src)
			.pipe($.notify({
				onLast: true,
				message: function() {
					return 'Build complete!';
				}
			}));
	});

	// BUILD (MINIFIED, NO CMS)
	// --------------------------------------|
	gulp.task('build:flat', ['lint:scripts', 'html:flat', 'images:minify', 'fonts:prod', 'copy'], () => {
		return gulp.src(config.build.src)
			.pipe($.notify({
				onLast: true,
				message: function() {
					return 'Flat build complete!';
				}
			}));
	});

	// DEFAULT GULP TASK
	// --------------------------------------|
	gulp.task('default', ['clean'], () => {
		gulp.start('build');
	});
};
