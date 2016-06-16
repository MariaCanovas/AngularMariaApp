'use strict';

var gulp = require ('gulp'),
    requireDir  = require('require-dir'),
    config = require('./gulp_tasks/config');

requireDir('./gulp_tasks');

gulp.task('default', function() {
	gulp.watch(config.js.srcToWatch, ['concat'])
		.on('change', logWatch);
	gulp.watch(config.sass.srcToWatch, ['sass'])
		.on('change', logWatch);
});

function logWatch(event) {
	console.log('*** File ' + event.path + 'was' + event.type + ', running tasks...');
}