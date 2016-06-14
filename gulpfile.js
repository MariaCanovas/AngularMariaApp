'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	sass = require('gulp-sass');

gulp.task('concat', function() {
	return gulp.src(['bower_components/angular/angular.js','js/controllers/mainController.js', 'js/directives/listaDirective.js', 'js/directives/relojDirective.js', 'js/filters/filters.js', 'js/services/localStorage.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('concatFiles/'));
});

gulp.task('minify', function() {
	gulp.src('concatFiles/main.js')
	.pipe(minify({
		ext:{
			src:'.js',
			min: '.min.js'
		}
		}))
	.pipe(gulp.dest('concatFiles'));
});

gulp.task('sass',function(){
    return gulp.src('css/estilos.scss')
    .pipe(sass())
    .pipe(gulp.dest('concatFiles/'));
});