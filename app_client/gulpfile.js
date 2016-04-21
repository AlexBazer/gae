var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    mithrilify = require('mithrilify'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    destFolder = '../app/static/',
    destFile = 'index.js',
    jsSourceFile = './js/index.js',
    jswSource = './js/**/*.js';

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('browserify', function(){
    return browserify({
            entries: jsSourceFile,
            transform: [mithrilify,]
        })
        .bundle()
        .on('error', handleErrors)
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
});

gulp.task('watch-browserify', function(){
    var bundler = watchify(browserify({
            entries: jsSourceFile,
            transform: [mithrilify,]
        }));
    bundler.on('update', rebundle);

    function rebundle(){
        return bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));
    }
    return rebundle();
});

gulp.task('default', ['browserify', 'watch-browserify']);
