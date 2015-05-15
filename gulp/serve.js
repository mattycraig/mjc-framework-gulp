// -----------------------------------------------------------------|
// SERVE TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, browserSync, reload) {

	// DEVELOPMENT SERVE
	// --------------------------------------|
	gulp.task('serve', ['wiredep', 'styles:dev', 'setWatch', 'views:dev', 'lint:html', 'lint:aria', 'lint:scripts', 'fonts:dev'], function() {

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
			'.tmp/**/*.html',
			'app/js/**/*.js',
			'app/images/**/*'
		]).on('change', reload);

		gulp.watch('.tmp/**/*.html', ['lint:html', 'lint:aria']);
		gulp.watch('app/css/**/*.scss', ['styles:dev']);
		gulp.watch('app/js/**/*.js', ['lint:scripts']);
		gulp.watch('app/jade/**/*.jade', ['views:dev']);
		gulp.watch('bower.json', ['wiredep', 'fonts:dev', reload]);
	});

	// PRODUCTION SERVE
	// --------------------------------------|
	gulp.task('serve:prod', ['wiredep', 'styles:prod', 'views:prod', 'fonts:prod'], function() {
		browserSync({
			notify: false,
			port: 9000,
			server: {
				baseDir: ['dist']
			}
		});
	});
};
