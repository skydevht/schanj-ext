const gulp = require('gulp');
const { src, dest, watch, parallel } = gulp;
const pug = require('gulp-pug');
const sass = require('gulp-sass');

function html() {
  return src('*.pug')
    .pipe(pug())
    .pipe(dest('build'));
}

function css() {
  return src('styles/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles'))
}

function js() {
  return src('scripts/*.js')
    .pipe(dest('build/scripts'));
}

function assets() {
  return src('assets/**/*')
    .pipe(dest('build/assets'));
}

function def() {
  gulp.watch('*.pug', html);
  gulp.watch('styles/*.scss', css);
  gulp.watch('scripts/*.js', js);
}

function firefox() {
  return src('firefox/**/*')
    .pipe(dest('build'));
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.assets = assets;
exports.firefox = parallel(js, css, html, assets, firefox);
exports.default = def;
