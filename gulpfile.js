var gulp=require('gulp');


//加载插件

var cssnano=require('gulp-cssnano');   //压缩css
     concat=require('gulp-concat'),      //合并文件
    autoprefixer = require('gulp-autoprefixer'),//自动添加前缀
    imagemin=require('gulp-imagemin'), //压缩图片
    jshint=require('gulp-jshint'), //规范化js
    uglify=require('gulp-uglify'), //压缩js
    browserSync=require('browser-sync')
    clean=require('gulp-clean')  //清除目录
    browserSync=require('browser-sync').create();

gulp.task('reload',function(){
    return browserSync.reload();
})

gulp.task('server',function(){                   //gulp server开启服务器
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });
    gulp.watch(['**/.css','**/.js','**/*.html'],['reload'])   //监听文件，发生改变则自动重新加载
})

gulp.task('styles',function(){
    return gulp.src('./css/*.css')
        .pipe(concat('index-merge-3.css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('script',function(){
    return gulp.src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('merge.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/scripts/'))
})

gulp.task('images',function(){
    return gulp.src('./images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images/'))
})

gulp.task('clean',function(){
    return gulp.src('dist/*',{read:false})
            .pipe(clean())
})



gulp.task('default', ['clean'], function() {
  gulp.start('styles','script','images');
});