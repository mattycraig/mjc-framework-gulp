// -----------------------------------------------------------------|
// SERVE TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, browserSync, reload) => {

	// DEVELOPMENT SERVE
	// --------------------------------------|
	gulp.task('serve', ['wiredep', 'styles:dev', 'setWatch', 'views:dev', 'lint:html', 'lint:scripts', 'fonts:dev'], () => {

		browserSync({
			notify: false,
			port: 9000,
			server: {
				baseDir: ['.tmp', 'app'],
				routes: {
					'/bower_components': 'bower_components'
				}
			}
		});

		// Watch our files for changes
		gulp.watch([
			// '.tmp/**/*.html',
			'app/js/**/*.js',
			'app/images/**/*'
		]).on('change', reload);

		gulp.watch('.tmp/**/*.html', ['lint:html']);
		gulp.watch('app/scss/**/*.scss', ['styles:dev']);
		gulp.watch('app/js/**/*.js', ['lint:scripts']);
		gulp.watch('app/jade/**/*.jade', ['views:dev']);
		gulp.watch('bower.json', ['wiredep', 'fonts:dev', reload]);
	});

	// PRODUCTION SERVE
	// --------------------------------------|
	gulp.task('serve:prod', ['wiredep', 'styles:prod', 'views:prod', 'fonts:prod'], () => {
		browserSync({
			notify: false,
			port: 9000,
			server: {
				baseDir: ['dist']
			}
		});
	});
};
