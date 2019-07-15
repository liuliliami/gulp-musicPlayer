var gulp = require("gulp");

//压缩html插件
var htmlClean = require("gulp-htmlclean");

//压缩图片插件
// var imageMin = require("gulp-imagemin");

//less转化为css
var less = require("gulp-less");

//css加前缀
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");

//压缩css插件
var cleanCss = require("gulp-clean-css");

//压缩js插件
var uglify = require("gulp-uglify");

//去掉js调试语句
// var debug = require("gulp-strip-debug");

//开启服务器
var connect = require("gulp-connect");
var watch = require("gulp-watch");

//保存当前工作环境（开发环境 or 生产环境）,会返回布尔值
//git中设置工作环境 export NODE_ENV=development 注意等号左右无空格
var devMode = process.env.NODE_ENV === "development";
// console.log(devMode);

//保存开发目录和输出目录
var folder = {
    src: "src/",
    dist: "dist/"
};

gulp.task("html", function () {
    return gulp.src(folder.src + "html/*")
        .pipe(connect.reload())//调用服务器的页面刷新命令
        // .pipe(htmlClean())
        .pipe(gulp.dest(folder.dist + "html/"))
});

gulp.task("image", function () {
    return gulp.src(folder.src + "image/*")
        // .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
});

//获取less -- 解析为css -- 添加前缀 -- 压缩css -- 输出css文件
gulp.task("css", function () {
    return gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())//less转化为css
        .pipe(postcss([autoprefixer()]))//添加前缀
        // .pipe(cleanCss())//压缩css
        .pipe(gulp.dest(folder.dist + "css/"))
});

gulp.task("js", function () {
    return gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        // .pipe(uglify())
        // .pipe(debug())
        .pipe(gulp.dest(folder.dist + "js/"))
});

gulp.task("server", function () {
    return connect.server({
        src: "/dist/html/index.html",
        port: 8888,//端口号
        livereload: true//实时刷新
    });
});

gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", gulp.series("html"));//gulp4中watch第二参数不能是["html"]形式
    gulp.watch(folder.src + "css/*", gulp.series("css"));
    gulp.watch(folder.src + "js/*", gulp.series("js"));
});


gulp.task("default", gulp.series(gulp.parallel("html", "image", "css", "js", "server", "watch")))
