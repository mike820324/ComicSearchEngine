var gulp = require('gulp');
var babel = require('gulp-babel');
var react = require('gulp-react');
var flow = require('gulp-flowtype');

var srcFolder = 'src/**/*.js';
var destFolder = 'dist';

gulp.task('build', function() {
	return gulp.src(srcFolder)
	.pipe(babel())
	.pipe(react({stripTypes:true}))
	.pipe(gulp.dest(destFolder));
});


