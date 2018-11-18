const gulp = require('gulp');
const serve = require('gulp-serve');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const plumberNotifier = require('gulp-plumber-notifier');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const run = require('run-sequence');
const del = require('del');

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(plumberNotifier())
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.stream());
});

gulp.task('stylus', function () {
    return gulp.src('src/stylus/style.styl')
        .pipe(plumberNotifier())
        .pipe(stylus())
        .pipe(postcss([
            autoprefixer({browsers: [
                    'last 2 versions',
                    'Explorer >= 10'
                ]}),
            mqpacker ({
                sort: true
            })
        ]))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(cleanss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('copy', function() {
    return gulp.src([
        "src/img/**"
    ], {
        base: 'src'
    })
        .pipe(gulp.dest("build"));
});

gulp.task('del', function() {
    return del('build');
})

gulp.task('build', function(done){
    run(
        'del',
        'copy',
        'stylus',
        'pug',
        done
    );
});

gulp.task('serve', ['build'], function(){
    browserSync.init({
        server: "build",
    });
    gulp.watch('src/styl/**/*.styl', ['stylus']);
    gulp.watch('src/**/*.pug', ['pug']);
});
