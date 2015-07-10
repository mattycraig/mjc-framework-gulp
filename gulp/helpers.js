// -----------------------------------------------------------------|
// HELPERS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp) => {

	// CLEAN TMP AND DIST FOLDERS
	// --------------------------------------|
	gulp.task('clean', require('del').bind(null, [
		'.tmp',
		'dist'
	]));
};
