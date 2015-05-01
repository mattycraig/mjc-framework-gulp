// -----------------------------------------------------------------|
// HELPERS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp) {

	// CLEAN TMP AND DIST FOLDERS
	// --------------------------------------|
	gulp.task('clean', require('del').bind(null, [
		'.tmp',
		'dist'
	]));
};
