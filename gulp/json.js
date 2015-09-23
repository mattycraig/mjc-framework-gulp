// -----------------------------------------------------------------|
// JSON TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, config) => {

	// EXPORT JSON VARIABLES TO SASS
	// --------------------------------------|
	gulp.task('json:styles', () => {
		return gulp.src(config.json.src.styles)
			.pipe($.jsonSass())
			.pipe($.concat(config.json.output.styles))
			.pipe(gulp.dest(config.json.dest.styles));

	});

	// COMBINE CONFIG/VARS JSON FOR USE IN JADE
	// --------------------------------------|
	gulp.task('json:views', ['clean:json'], () => {
		return gulp.src(config.json.src.views)
			.pipe($.jsoncombine(config.json.output.views, function(data) {
				// return new Buffer(JSON.stringify(data, null, 4)); // Formatted
				return new Buffer(JSON.stringify(data)); // Unformated
			}))
			.pipe(gulp.dest(config.json.dest.views))
			.pipe(gulp.dest('dist/json'));
	});

};
