// -----------------------------------------------------------------|
// IMAGES TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $) {

	// MINIFY IMAGES
	// --------------------------------------|
	gulp.task('images:minify', function() {
		return gulp.src('app/images/**/*')
			.pipe($.imagemin({
				progressive: true,
				interlaced: true,
				svgoPlugins: [{
					cleanupIDs: false
				}]
			}))
			.pipe(gulp.dest('dist/images'));
	});

	// CREATE RESPONSIVE IMAGES
	// --------------------------------------|
	// This needs more research - and doesn't work on windows
	// See gulp-responsive

	// gulp.task('images:responsive', function() {
	// 	gulp.src('app/images/**/*.{jpg,gif,png}')
	// 		.pipe($.responsive([{
	// 			'*.{jpg,gif,png}' : [{
	// 				width: 320,
	// 				rename: {
	// 					suffix: "-sm"
	// 				}
	// 			}, {
	// 				width: 640,
	// 				rename: {
	// 					suffix: "-md"
	// 				}
	// 			}, {
	// 				width: 1280,
	// 				rename: {
	// 					suffix: "-lg"
	// 				}
	// 			}, {
	// 				width: 2560,
	// 				rename: {
	// 					suffix: "-lgst"
	// 				}
	// 			}]
	// 		}]))
	// 		.pipe(gulp.dest('dist/images/resp'));
	// });
};