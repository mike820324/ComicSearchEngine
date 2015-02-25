var gulp = require('gulp');
var babel = require('gulp-babel');

var srcFolder = 'src/**/*.js';
var destFolder = 'dist';

gulp.task('build', function() {
	return gulp.src(srcFolder)
	.pipe(babel())
	.pipe(gulp.dest(destFolder));
});


