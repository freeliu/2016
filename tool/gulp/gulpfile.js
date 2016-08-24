var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    rename=require('gulp-rename'),
    uglify=require('gulp-uglify'),
    notify = require('gulp-notify')

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 100 versions'],
            cascade: false
        }))
        .pipe(concat('main.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(notify({message: 'css task ok'}));
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'))
        .pipe(notify({message: 'html task ok'}));

});
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        // .pipe(gulp.dest('js'))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'))
        .pipe(notify({ message: 'js task ok' }));
});




gulp.task('default', function () {
    gulp.run('css','html','js');
    gulp.watch('src/css/*.css', function () {
        gulp.run('css');
    });
    gulp.watch('src/js/*.js', function () {
        gulp.run('js');
    });
    gulp.watch('src/*.html', function () {
        gulp.run('html');
    });
    // gulp.watch('js/src/*.js', function () {
    //
    // });


});