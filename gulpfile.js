"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var runSequence = require("run-sequence");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var opn = require("opn");
var sass = require("gulp-sass");
var del = require("del");
var minifyCss = require("gulp-minify-css");
var nodemon = require("gulp-nodemon");

gulp.task("compile", function (cb) {
    browserify({
        entries: "./src/components/CommentBox.js",
        extensions: [".js"],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/js"))
        .on("end", function() {
            cb();
        });
});

gulp.task("compile:production", function () {
    browserify({
        entries: "./src/components/CommentBox.js",
        extensions: [".js"],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("sass", function () {
    gulp.src("./src/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/css"));
});

gulp.task("sass:dist", function () {
    gulp.src("src/styles/*.scss")
        .pipe(sass())
        .pipe(buffer())
        .pipe(minifyCss({compatibility: "ie8"}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("copy", function () {
    gulp.src("./src/index.html")
        .pipe(gulp.dest("./build"));

    gulp.src("./src/styles/**/*.css")
        .pipe(gulp.dest("./build/css"));

    gulp.src("./src/assets/**/*")
        .pipe(gulp.dest("./build/assets"));

    gulp.src("./src/api/**/*")
        .pipe(gulp.dest("./build/api"));
});

gulp.task("copy:production", function () {
    gulp.src("src/index.html")
        .pipe(gulp.dest("./dist"));

    gulp.src("src/styles/*.css")
        .pipe(gulp.dest("./dist/css"));

    gulp.src("src/assets/**/*")
        .pipe(gulp.dest("./dist/assets"));
});

gulp.task("clean", function (cb) {
    return del("./build", cb);
});

gulp.task("clean:production", function (cb) {
    return del(["./dist"], cb);
});

gulp.task("watch", function () {
    gulp.watch(["src/**/*.js", "src/*.html", "src/styles/*.scss", "src/api/*.json"], function () {
        runSequence(["compile", "copy", "sass"]);
    });
});

gulp.task("reload", function () {
    connect.reload();
});

gulp.task("opn", function () {
    opn("http://localhost:3000");
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task("default", function () {
    runSequence(["clean"], ["compile", "sass", "copy"], "server", "opn", "watch");
});

gulp.task("build", ["default"]);

gulp.task("production", function () {
    runSequence(["clean:production"], ["compile:production"], "sass:dist", "copy:production");
});
