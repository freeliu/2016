//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
   var  imagemin = require('gulp-imagemin');//图片压缩
   var  pngcrush = require('imagemin-pngcrush');
   var  notify = require('gulp-notify');//提示信息

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
});


//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
//    root: '',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('img', function() {
  return gulp.src('images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('min/'))
    .pipe(notify({ message: 'img task ok' }));
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch','img']);

