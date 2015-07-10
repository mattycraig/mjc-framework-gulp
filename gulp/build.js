// -----------------------------------------------------------------|
// BUILD TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, config) => {

	var s = $.size();

	// BUILD (UNMINIFIED, WITH CMS)
	// --------------------------------------|
	gulp.task('build', ['lint:scripts', 'html:prod', 'images:minify', 'fonts:prod', 'copy'], () => {
		return gulp.src(config.build.src)
			.pipe(s)
			.pipe($.notify({
				onLast: true,
				message: function() {
					return 'Build complete (' + s.prettySize + ')';
				}
			}));
	});

	// BUILD (MINIFIED, NO CMS)
	// --------------------------------------|
	gulp.task('build:flat', ['lint:scripts', 'html:flat', 'images:minify', 'fonts:prod', 'copy'], () => {
		return gulp.src(config.build.src)
			.pipe(s)
			.pipe($.notify({
				onLast: true,
				message: function() {
					return 'Build complete (' + s.prettySize + ')';
				}
			}));
	});

	// DEFAULT GULP TASK
	// --------------------------------------|
	gulp.task('default', ['clean'], () => {
		gulp.start('build');
	});
};
