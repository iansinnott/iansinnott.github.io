var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    shell        = require('gulp-shell'),
    livereload   = require('gulp-livereload'),
    lr           = require('tiny-lr'),
    server       = lr();

/**
 * Compile sass and reload the page. This takes the extra step of sending the
 * css into _site/ which would otherwise only be done by using `jekyll build`.
 * I save the compiled css to both locations so that during an actual build the
 * result will be exactly the same.
 */
gulp.task('sass', function() {
  return gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(gulp.dest('_site/public/css'))
    .pipe(livereload(server));
});

gulp.task('build', shell.task([ 'jekyll build' ]));

gulp.task('watch', function() {
  server.listen(35729, function(err) {
    if (err)
      return console.log(err);

    gulp.watch('sass/**/*.scss', ['sass']);

    gulp.watch([
      '_includes/**/*.html',
      '_layouts/**/*.html',
      '_posts/**/*'
    ], ['build']);

  });
});
