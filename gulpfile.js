var gulp = require('gulp');


//加载插件

var cssnano = require('gulp-cssnano');   //压缩css
    concat = require('gulp-concat'),      //合并文件
    autoprefixer = require('gulp-autoprefixer'),//自动添加前缀
    imagemin = require('gulp-imagemin'), //压缩图片
    jshint = require('gulp-jshint'), //规范化js
    uglify = require('gulp-uglify'), //压缩js
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),  //清除目录
    browserSync = require('browser-sync').create(),　//启动服务，实现浏览器重载等
    rev = require('gulp-rev'),   //添加版本号
    revReplace = require('gulp-rev-replace')   //版本号替换
    useref = require('gulp-useref')  //解析html资源定位,划分区块，生成目标文件


gulp.task('dist:css', function () {
    return gulp.src('./css/*.css')
        .pipe(concat('merge.css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('dist:js', function () {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('merge.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
})

gulp.task('dist:images', function () {
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
})

gulp.task('clean', function () {
    return gulp.src('dist/*', { read: false })
        .pipe(clean())
})



gulp.task("revision", ['dist:css', 'dist:js', 'dist:images'], function () {
    return gulp.src(["dist/**/*.css", "dist/**/*.js"])
        .pipe(rev())   //添加版本号
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest()) //生成一个json文件记录版本号
        .pipe(gulp.dest('dist'))
})

gulp.task("index", ["revision"], function () {
    var manifest = gulp.src("./dist/rev-manifest.json")

    return gulp.src("index.html")
        .pipe(revReplace({ manifest: manifest }))
        .pipe(useref())
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean'], function () {
    gulp.start('index');                    //输入gulp,开始进行上述所有步骤，css,js,img压缩合并,自动替换，生成新的index.html,直接发布
});

gulp.task('reload', function () {
    return browserSync.reload();
})

gulp.task('server', function () {                   //gulp server开启本地服务器
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(['**/.css', '**/.js', '**/*.html'], ['reload'])   //监听文件，发生改变则自动重新加载
})