const gulp = require('gulp');
const { src, dest, watch } = gulp;
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function html() {
  return src('*.pug')
    .pipe(pug())
    .pipe(dest('build'));
}

function css() {
  return src('styles/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles'))
    .pipe(browserSync.stream());
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
  browserSync.init({
    server: 'build',
  });

  gulp.watch('*.pug', html).on('change', browserSync.reload);
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
exports.firefox = firefox;
exports.default = def;
