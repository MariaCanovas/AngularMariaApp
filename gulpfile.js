'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('concat', function() {
	return gulp.src(['js/controllers/mainController.js', 'js/directives/listaDirective.js', 'js/directives/relojDirective.js', 'js/filters/filters.js', 'js/services/localStorage.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('concatFiles/'));
});