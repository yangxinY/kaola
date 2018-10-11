//gulp的插件;

//1.http插件；（服务器插件）
//gulp connect;

const gulp=require("gulp");
//gulp服务器插件；
const connect=require("gulp-connect");
//gulp合并插件；
var concat=require('gulp-concat');
//压缩插件;
var uglify=require("gulp-uglify");
//babel 插件;
var babel=require("gulp-babel");
//css插件;
var cleanCss=require("gulp-clean-css");
gulp.task('connect', function() {
    connect.server({
        port:8888,
        root:"dist/",
        livereload:true,
        middleware:function(connect , opt){
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
  });

  //如何发起端口请求：
  //localhost:8888/proxy/目标;

   
  gulp.task("html",()=>{
    return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());;
 
})

gulp.task("watch",()=>{
    gulp.watch("index.html",["html"]);
})

//同时监听两个指令，一个监听，一个connect
gulp.task("default",["watch","connect"]);

//script转存指令：
gulp.task("script", ()=>{
    return gulp.src(["script/app/*.js","script/module/*.js","script/libs/*.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/script"));
    })

//压缩
gulp.task("css",()=>{
    return gulp.src(["styles/*.css"])
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/css"))
})

//编译？es6=>es5;
gulp.task("es6",()=>{
    return gulp.src("script/es2015/*.js")
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"));//转存
})