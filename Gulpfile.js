const gulp           = require('gulp'),
      browsersync    = require('browser-sync').create(),
      sass           = require('gulp-sass'),
      rename         = require("gulp-rename"),
      terser         = require('gulp-terser'),
      imagemin       = require('gulp-imagemin'),
      autoprefixer   = require('gulp-autoprefixer');
      debug          = require('gulp-debug');
      fs             = require('fs'),
      sourcemaps     = require('gulp-sourcemaps'),
      dir            = {src: 'src/', dest: 'dist/'};

// Settings for live reload
let browserSync = cb => {
    browsersync.init({
        server: {
            baseDir: dir.dest
        },
        port: 3001
    });
    cb();
};

// Task for sass prepossessing
let css = () => {
    return gulp
        .src(dir.src + 'sass/importer.scss')
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(rename('main.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(dir.dest + "css"))
        .pipe(browsersync.stream());
};

// Task to minify javascript
let js = () => {
    return gulp
        .src(dir.src + 'js/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dir.dest + "js"))
        .pipe(browsersync.stream());
};

// Task to copy html
let html = () => {
    return gulp
        .src(dir.src + '*.html')
        .pipe(gulp.dest(dir.dest))
        .pipe(browsersync.stream());
};

// Task to copy and optimize images
let media = () => {
  return gulp
      .src(dir.src + 'media/**/*.{gif,jpg,png,svg,ico}')
      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
                  ]
          })]
          )
      )
      .pipe(gulp.dest(dir.dest + 'media/'))
      .pipe(browsersync.stream());
};

// Task to watch for any changes
let watch = cb => {
    gulp.watch('src/sass/*.scss', css);
    gulp.watch('src/js/*.js', js);
    gulp.watch('src/*.html', html);
    gulp.watch('src/media/**/*.{gif,jpg,png,svg,ico}', media);
    cb();
};

exports.default = gulp.series(browserSync, watch);