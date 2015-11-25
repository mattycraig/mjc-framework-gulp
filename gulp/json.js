// -----------------------------------------------------------------|
// JSON TASKS
// -----------------------------------------------------------------|

export default (gulp, $, config) => {

	// EXPORT JSON VARS TO SASS
	// --------------------------------------|
	gulp.task('json:styles', () => {
		return gulp.src(config.json.src.styles)
			.pipe($.jsonSass())
			.pipe($.concat(config.json.output.styles))
			.pipe(gulp.dest(config.json.dest.styles));

	});

	// COMBINE JSON FOR USE IN JADE/JS
	// --------------------------------------|
	gulp.task('json:views', ['clean:json'], () => {
		return gulp.src(config.json.src.views)
			.pipe($.jsoncombine(config.json.output.views, function(data) {
				// return new Buffer(JSON.stringify(data, null, 4)); // Formatted
				return new Buffer(JSON.stringify(data)); // Unformatted
			}))
			.pipe(gulp.dest(config.json.dest.views))
			.pipe(gulp.dest(config.json.dest.dist));
	});

};
