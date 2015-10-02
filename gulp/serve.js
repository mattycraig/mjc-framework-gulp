// -----------------------------------------------------------------|
// SERVE TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, browserSync, reload) => {

	// DEVELOPMENT SERVE
	// --------------------------------------|
	gulp.task('serve', ['clean', 'wiredep', 'styles:dev', 'setWatch', 'views:dev', 'lint:html', 'lint:scripts', 'fonts:dev'], () => {

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

		// Watch html files for linting
		gulp.watch(
			'.tmp/**/*.html',
			['lint:html']);
			// ['lint:html', 'lint:aria']);

		// Watch sass files
		gulp.watch([
			'app/scss/**/*.scss',
			'!app/scss/config/vars/__output.scss',
			], ['styles:dev']);

		// Watch scripts
		gulp.watch(
			'app/js/**/*.js',
			['lint:scripts', 'inject:scripts']);

		// Watch jade files
		gulp.watch(
			'app/jade/**/*.jade',
			['views:devWatch']);

		// Watch json files
		gulp.watch([
			'app/json/**/*.json',
			'!app/json/vars.json',
			'!app/json/__output.scss'
			], ['views:dev']);

		// Watch json scss vars
		gulp.watch(
			'app/json/vars.json',
			['styles:dev', 'views:dev']);

		// Watch bower.json
		gulp.watch(
			'bower.json',
			['wiredep', 'fonts:dev', reload]);
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

	// TEST SERVE
	// --------------------------------------|
	gulp.task('serve:test', ['inject:tests'], () => {
		browserSync({
			notify: false,
			port: 9000,
			ui: false,
			server: {
				baseDir: ['test', 'app'],
				routes: {
					'/bower_components': 'bower_components'
				}
			}
		});

		gulp.watch('test/spec/**/*.js').on('change', reload);
		gulp.watch('test/spec/**/*.js', ['lint:test']);
	});

};
