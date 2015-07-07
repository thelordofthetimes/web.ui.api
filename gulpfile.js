// get modules
var gulp = require('gulp');
var config = require('./task/config');

// get tasks
require('./task/dest');


// default task
gulp.task('default', ['dest']);