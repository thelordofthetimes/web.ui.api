// get modules
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var config = require('./config');

// clean task
gulp.task('script.clean', function() {
    return gulp.src(config.dest.script).
        pipe(clean());
});

// javascript task
var jsSrc = [
    config.src.script + 'main.js',
    config.src.script + 'constant/*.js',
    config.src.script + 'provider/*.js',
    config.src.script + 'service/*.js',
    config.src.script + 'factory/*.js',
    config.src.script + 'directive/*.js',
    config.src.script + 'filter/*.js',
    config.src.script + 'controller/*.js'
];
gulp.task('script', ['script.clean'], function() {
    return gulp.src(jsSrc).        
        pipe(concat('web.ui.api.js')).

        // join script to one file
        pipe(gulp.dest(config.dest.script)).
        pipe(uglify()).
        
        // compress script
        pipe(concat('web.ui.api.min.js')).
        pipe(gulp.dest(config.dest.script));
});

// watch
gulp.task('script.watch', function() {
	var path = config.src.script + '**/*.js';
	gulp.watch(path, ['script']);
});