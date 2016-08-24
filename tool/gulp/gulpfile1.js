var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dest'))
        .pipe(notify({ message: 'html task ok' }));

});


gulp.task('img', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./dest/images/'))
        .pipe(notify({ message: 'img task ok' }));
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dest/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css'))
        .pipe(notify({ message: 'css task ok' }));
});


gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});


gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
        .pipe(notify({ message: 'js task ok' }));
});

gulp.task('default', function(){
    gulp.run('img', 'css', 'lint', 'js', 'html');

    gulp.watch('src/*.html', function(){
        gulp.run('html');
    });

    gulp.watch('src/css/*.css', ['css']);


    gulp.watch('src/js/*.js', ['lint', 'js']);

    gulp.watch('src/images/*', ['img']);
});