"use strict";
let gulp = require('gulp'),
concat = require('gulp-concat'),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'),
htmlmin = require('gulp-htmlmin'),
del = require('del');

gulp.task('css', () =>
    gulp.src([
    'css/normalize.css',
    'css/foundation.css',
    'css/basics.css',
    'css/menu.css',
    'css/hero.css',
    'css/photo-grid.css',
    'css/modals.css',
    'css/footer.css'
  ])
    .pipe(cleanCSS())
    .pipe(concat('application.min.css'))
    .pipe(gulp.dest('css'))
);

gulp.task('js', () =>
    gulp.src([
    'js/jquery.js',
    'js/fastclick.js',
    'js/foundation.js',
    'js/foundation.equalizer.js',
    'js/foundation.reveal.js'
  ])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('js'))
);

gulp.task('img', () =>
    gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});


gulp.task('clean', function() {
  del(['dist', 'css/application.min.css', 'js/app.min.js']);
});


// gulp.task("default", ['clean', 'js', 'img', 'css', 'html']);


gulp.task("build", ['js', 'img', 'css', 'html'], function() {
  return gulp.src(['css/application.min.css', 'js/app.min.js'], { base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
