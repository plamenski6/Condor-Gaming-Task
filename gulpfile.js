const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');

function copyHTML() {
    return src('*.html').pipe(gulp.dest('dist'));
}

function imgTask() {
    return src('images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

function cssTask() {
    return src('*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}

function watchTask() {
    watch(['*.css'], { interval: 1000 }, parallel(cssTask));
}

exports.default = series(parallel(copyHTML, imgTask, cssTask), watchTask);