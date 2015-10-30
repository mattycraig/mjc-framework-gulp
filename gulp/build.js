// -----------------------------------------------------------------|
// BUILD TASKS
// -----------------------------------------------------------------|

export default (gulp, $, config) => {

	let build = (type) => {
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
	gulp.task('build', ['html:prod', 'images:minify', 'fonts:prod', 'copy'], () => {
		build('Build');
	});

	// BUILD (MINIFIED, NO CMS)
	// --------------------------------------|
	gulp.task('build:flat', ['clean', 'html:flat', 'images:minify', 'fonts:prod', 'copy'], () => {
		build('Flat build');
	});

	// DEFAULT GULP TASK
	// --------------------------------------|
	gulp.task('default', ['clean'], () => {
		gulp.start('build');
	});
};
