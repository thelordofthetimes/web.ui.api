// get modules
var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('./config');

// get tasks
require('./script');

// clean task
gulp.task('dest.clean', function() {
    return gulp.src(config.dest.base).
        pipe(clean());
});

// build task
gulp.task('dest', ['script']);

// watch task
gulp.task('watch', ['dest', 'script.watch']);