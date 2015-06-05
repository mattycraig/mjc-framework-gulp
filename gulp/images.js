// -----------------------------------------------------------------|
// IMAGES TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, config) {

	// MINIFY IMAGES
	// --------------------------------------|
	gulp.task('images:minify', function() {
		return gulp.src(config.images.src)
			.pipe($.if($.if.isFile, $.cache($.imagemin({
				progressive: true,
				interlaced: true,
				svgoPlugins: [{
					cleanupIDs: false
				}]
			}))
			.on('error', function(err){ console.log(err); this.end; })))
			.pipe(gulp.dest(config.images.dest));
	});

	// CREATE RESPONSIVE IMAGES
	// --------------------------------------|
	// This needs more research
	// See gulp-responsive

	// gulp.task('images:responsive', function() {
	// 	return gulp.src('app/images/**/*.{jpg,gif,png}')
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
