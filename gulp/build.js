// -----------------------------------------------------------------|
// BUILD TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function(gulp, $, config) {

	function build(type) {
		return gulp.src(config.build.src)
			.pipe($.notify({
				onLast: true,
				message: function() {
					return type + ' complete!';
				}
			}));
	}

	// BUILD (UNMINIFIED, WITH CMS)
	// --------------------------------------|
	gulp.task('build', ['lint:scripts', 'html:prod', 'images:minify', 'fonts:prod', 'copy'], () => {
		build('Build');
	});

	// BUILD (MINIFIED, NO CMS)
	// --------------------------------------|
	gulp.task('build:flat', ['lint:scripts', 'html:flat', 'images:minify', 'fonts:prod', 'copy'], () => {
		build('Flat build');
	});

	// DEFAULT GULP TASK
	// --------------------------------------|
	gulp.task('default', ['clean'], () => {
		gulp.start('build');
	});
};
